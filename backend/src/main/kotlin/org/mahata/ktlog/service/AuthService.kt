package org.mahata.ktlog.service

import org.mahata.ktlog.config.JwtProperties
import org.mahata.ktlog.data.AuthRequest
import org.mahata.ktlog.data.AuthResponse
import org.mahata.ktlog.repository.RefreshTokenRepository
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import java.util.Date

@Service
class AuthService(
    private val authManager: AuthenticationManager,
    private val userDetailsService: CustomUserDetailsService,
    private val tokenService: TokenService,
    private val jwtProperties: JwtProperties,
    private val refreshTokenRepository: RefreshTokenRepository,
) {
    fun authentication(authRequest: AuthRequest): AuthResponse {
        authManager.authenticate(
            (
                UsernamePasswordAuthenticationToken(
                    authRequest.email,
                    authRequest.password,
                )
            ),
        )

        val user = userDetailsService.loadUserByUsername(authRequest.email)

        val accessToken = createAccessToken(user)
        val refreshToken = createRefreshToken(user)

        refreshTokenRepository.save(refreshToken, user)

        return AuthResponse(
            accessToken = accessToken,
            refreshToken = refreshToken,
        )
    }

    fun refreshAccessToken(refreshToken: String): String? {
        val extractedEmail = tokenService.extractEmail(refreshToken)

        return extractedEmail?.let { email ->
            val currentUserDetails = userDetailsService.loadUserByUsername(email)
            val refreshTokenUserDetails = refreshTokenRepository.findUserDetailsByToken(refreshToken)

            if (!tokenService.isExpired(refreshToken) && refreshTokenUserDetails?.username == currentUserDetails.username) {
                createAccessToken(currentUserDetails)
            } else {
                null
            }
        }
    }

    private fun createAccessToken(user: UserDetails) =
        tokenService.generate(
            userDetails = user,
            expirationDate = getAccessTokenExpiration(),
        )

    private fun createRefreshToken(user: UserDetails) =
        tokenService.generate(
            userDetails = user,
            expirationDate = getRefreshTokenExpiration(),
        )

    private fun getAccessTokenExpiration(): Date = Date(System.currentTimeMillis() + jwtProperties.accessTokenExpiration)

    private fun getRefreshTokenExpiration(): Date = Date(System.currentTimeMillis() + jwtProperties.refreshTokenExpiration)
}
