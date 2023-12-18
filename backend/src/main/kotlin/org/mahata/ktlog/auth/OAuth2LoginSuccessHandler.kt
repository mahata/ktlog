package org.mahata.ktlog.auth

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.mahata.ktlog.repository.UserRepository
import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.core.user.DefaultOAuth2User
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler
import org.springframework.stereotype.Component

@Component
class OAuth2LoginSuccessHandler(
    private val userRepository: UserRepository,
) : SimpleUrlAuthenticationSuccessHandler() {
    override fun onAuthenticationSuccess(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authentication: Authentication,
    ) {
        val oauthUser = authentication.principal as DefaultOAuth2User
        val email = oauthUser.getAttribute<String>("email") ?: return

        val userEntity = userRepository.findByEmail(email)
        if (userEntity == null) {
            response.sendRedirect("/signup")
        }

        super.onAuthenticationSuccess(request, response, authentication)
    }
}
