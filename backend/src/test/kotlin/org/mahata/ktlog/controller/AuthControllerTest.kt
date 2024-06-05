package org.mahata.ktlog.controller

import com.fasterxml.jackson.databind.ObjectMapper
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import org.hamcrest.CoreMatchers.containsString
import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.allOf
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mahata.ktlog.config.JwtProperties
import org.mahata.ktlog.data.AuthRequest
import org.mahata.ktlog.data.AuthResponse
import org.mahata.ktlog.service.AuthService
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders

@ExtendWith(MockKExtension::class)
class AuthControllerTest {
    @MockK
    private lateinit var stubAuthService: AuthService

    @MockK
    private lateinit var stubJwtProperties: JwtProperties

    private lateinit var mockMvc: MockMvc

    @Nested
    @DisplayName("POST /api/v1/auth")
    inner class PostApiV1Auth {
        @BeforeEach
        fun setUp() {
            mockMvc = MockMvcBuilders.standaloneSetup(AuthController(stubAuthService, stubJwtProperties)).build()
            every { stubJwtProperties.accessTokenExpiration } returns 360000L
            every { stubJwtProperties.refreshTokenExpiration } returns 8640000L
        }

        @Test
        fun `returns access token and refresh token while storing same data to cookie`() {
            val authRequest = AuthRequest(email = "john-doe@example.com", password = "password")
            val authResponse = AuthResponse(accessToken = "access-token", refreshToken = "refresh-token")

            every { stubAuthService.authentication(authRequest) } returns authResponse

            val objectMapper = ObjectMapper()

            val result =
                mockMvc.perform(
                    MockMvcRequestBuilders.post("/api/v1/auth")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authRequest)),
                )
                    .andExpect(status().isOk)
                    .andExpect(jsonPath("$.accessToken").value("access-token"))
                    .andExpect(jsonPath("$.refreshToken").value("refresh-token"))
                    .andReturn()

            val setCookieHeaders = result.response.getHeaders("Set-Cookie")

            val accessTokenCookie = setCookieHeaders.find { it.startsWith("accessToken=") }
            assertThat(
                accessTokenCookie,
                allOf(
                    containsString("accessToken=access-token"),
                    containsString("Path=/"),
                    containsString("HttpOnly"),
                    containsString("Secure"),
                    containsString("Max-Age=360000"),
                ),
            )

            val refreshTokenCookie = setCookieHeaders.find { it.startsWith("refreshToken=") }
            assertThat(
                refreshTokenCookie,
                allOf(
                    containsString("refreshToken=refresh-token"),
                    containsString("Path=/"),
                    containsString("HttpOnly"),
                    containsString("Secure"),
                    containsString("Max-Age=8640000"),
                ),
            )
        }
    }

    @Test
    fun refreshAccessToken() {
    }
}
