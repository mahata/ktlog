package org.mahata.ktlog.controller

import jakarta.servlet.http.HttpServletResponse
import org.mahata.ktlog.config.JwtProperties
import org.mahata.ktlog.data.AuthRequest
import org.mahata.ktlog.data.AuthResponse
import org.mahata.ktlog.data.RefreshTokenRequest
import org.mahata.ktlog.data.TokenResponse
import org.mahata.ktlog.service.AuthService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseCookie
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/v1/auth")
class AuthController(
    private val authService: AuthService,
    private val jwtProperties: JwtProperties,
) {
    @PostMapping
    fun authenticate(
        @RequestBody authRequest: AuthRequest,
        response: HttpServletResponse,
    ): AuthResponse {
        val authResponse = authService.authentication(authRequest)

        val accessTokenCookie = createHttpOnlyCookie("accessToken", authResponse.accessToken, "/", jwtProperties.accessTokenExpiration)
        val refreshTokenCookie =
            createHttpOnlyCookie("refreshToken", authResponse.refreshToken, "/api/v1/refresh", jwtProperties.refreshTokenExpiration)

        response.addHeader("Set-Cookie", accessTokenCookie.toString())
        response.addHeader("Set-Cookie", refreshTokenCookie.toString())

        return authResponse
    }

    @PostMapping("/refresh")
    fun refreshAccessToken(
        @RequestBody request: RefreshTokenRequest,
    ): TokenResponse =
        authService.refreshAccessToken(request.token)
            ?.mapToTokenResponse()
            ?: throw ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid refresh token.")

    private fun createHttpOnlyCookie(
        name: String,
        value: String,
        path: String,
        maxAge: Long,
    ): ResponseCookie {
        return ResponseCookie.from(name, value)
            .httpOnly(true)
            .path(path)
            .maxAge(maxAge)
            .secure(false) // TODO: FixMe - with test properties
            .sameSite("Lax")
            .build()
    }

    private fun String.mapToTokenResponse(): TokenResponse = TokenResponse(token = this)
}
