package org.mahata.ktlog.controller

import org.mahata.ktlog.data.AuthRequest
import org.mahata.ktlog.data.AuthResponse
import org.mahata.ktlog.data.RefreshTokenRequest
import org.mahata.ktlog.data.TokenResponse
import org.mahata.ktlog.service.AuthService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/v1/auth")
class AuthController(
    private val authService: AuthService,
) {
    @PostMapping
    fun authenticate(
        @RequestBody authRequest: AuthRequest,
    ): AuthResponse = authService.authentication(authRequest)

    @PostMapping("/refresh")
    fun refreshAccessToken(
        @RequestBody request: RefreshTokenRequest,
    ): TokenResponse =
        authService.refreshAccessToken(request.token)
            ?.mapToTokenResponse()
            ?: throw ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid refresh token.")

    private fun String.mapToTokenResponse(): TokenResponse = TokenResponse(token = this)
}
