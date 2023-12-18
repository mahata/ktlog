package org.mahata.ktlog.auth

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.junit.jupiter.api.Test
import org.mahata.ktlog.repository.UserRepository
import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.core.user.DefaultOAuth2User

class OAuth2LoginSuccessHandlerTest {
    @Test
    fun `when user does not exist, should redirect to signup`() {
        val email = "mahata777@gmail.com"

        val userRepository: UserRepository = mockk()
        val handler = OAuth2LoginSuccessHandler(userRepository)
        val request: HttpServletRequest = mockk(relaxed = true)
        val response: HttpServletResponse = mockk(relaxed = true)
        val authentication: Authentication = mockk(relaxed = true)
        val oauthUser: DefaultOAuth2User = mockk(relaxed = true)

        every { authentication.principal } returns oauthUser
        every { oauthUser.getAttribute<String>("email") } returns email
        every { userRepository.findByEmail(email) } returns null

        handler.onAuthenticationSuccess(request, response, authentication)

        verify { response.sendRedirect("/signup") }
    }
}
