package org.mahata.ktlog.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import jakarta.servlet.http.Cookie
import org.hamcrest.CoreMatchers.containsString
import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.allOf
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mahata.ktlog.config.JwtProperties
import org.mahata.ktlog.data.AuthRequest
import org.mahata.ktlog.data.AuthResponse
import org.mahata.ktlog.service.AuthService
import org.mahata.ktlog.service.CustomUserDetailsService
import org.mahata.ktlog.service.TokenService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.util.TestPropertyValues
import org.springframework.context.ConfigurableApplicationContext
import org.springframework.http.MediaType
import org.springframework.security.core.userdetails.User
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.MvcResult
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders

@SpringBootTest
@ExtendWith(MockKExtension::class)
class AuthControllerTest {
    @MockK
    private lateinit var stubAuthService: AuthService

    @MockK
    private lateinit var stubJwtProperties: JwtProperties

    @MockkBean
    private lateinit var userDetailsService: CustomUserDetailsService

    @MockkBean
    private lateinit var tokenService: TokenService

    @Autowired
    private lateinit var context: ConfigurableApplicationContext

    private lateinit var mockMvc: MockMvc

    @Nested
    @DisplayName("POST /api/v1/auth")
    inner class PostApiV1Auth {
        private val authRequest = AuthRequest(email = "john-doe@example.com", password = "password")
        private val authResponse = AuthResponse(accessToken = "access-token", refreshToken = "refresh-token")

        private lateinit var result: MvcResult

        @Nested
        @DisplayName("Non HTTPS Environment")
        inner class NoHttps {
            @BeforeEach
            fun setUp() {
                mockMvc =
                    MockMvcBuilders.standaloneSetup(
                        AuthController(
                            stubAuthService,
                            userDetailsService,
                            tokenService,
                            stubJwtProperties,
                            false,
                        ),
                    ).build()
                every { stubJwtProperties.accessTokenExpiration } returns 360000L
                every { stubJwtProperties.refreshTokenExpiration } returns 8640000L

                every { stubAuthService.authentication(authRequest) } returns authResponse

                val objectMapper = ObjectMapper()

                result =
                    mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/v1/auth")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(authRequest)),
                    )
                        .andExpect(status().isOk)
                        .andExpect(jsonPath("$.accessToken").value("access-token"))
                        .andExpect(jsonPath("$.refreshToken").value("refresh-token"))
                        .andReturn()
            }

            @Test
            fun `stores access token to cookie`() {
                val setCookieHeaders = result.response.getHeaders("Set-Cookie")

                val accessTokenCookie = setCookieHeaders.find { it.startsWith("accessToken=") }
                assertThat(
                    accessTokenCookie,
                    allOf(
                        containsString("accessToken=access-token"),
                        containsString("Path=/"),
                        containsString("HttpOnly"),
                        containsString("SameSite=Lax"),
                        containsString("Max-Age=360000"),
                    ),
                )
                assertEquals(-1, accessTokenCookie?.indexOf("Secure"), "Secure attribute should not be set")
            }

            @Test
            fun `stores refresh token to cookie`() {
                val setCookieHeaders = result.response.getHeaders("Set-Cookie")

                val refreshTokenCookie = setCookieHeaders.find { it.startsWith("refreshToken=") }
                assertThat(
                    refreshTokenCookie,
                    allOf(
                        containsString("refreshToken=refresh-token"),
                        containsString("Path=/api/v1/refresh"),
                        containsString("HttpOnly"),
                        containsString("SameSite=Lax"),
                        containsString("Max-Age=8640000"),
                    ),
                )
                assertEquals(-1, refreshTokenCookie?.indexOf("Secure"), "Secure attribute should not be set")
            }
        }

        @Nested
        @DisplayName("HTTPS Environment")
        inner class Https {
            @BeforeEach
            fun setUp() {
                TestPropertyValues.of("application.cookie.secure=true").applyTo(context)

                mockMvc =
                    MockMvcBuilders.standaloneSetup(
                        AuthController(
                            stubAuthService,
                            userDetailsService,
                            tokenService,
                            stubJwtProperties,
                            true,
                        ),
                    ).build()
                every { stubJwtProperties.accessTokenExpiration } returns 360000L
                every { stubJwtProperties.refreshTokenExpiration } returns 8640000L

                every { stubAuthService.authentication(authRequest) } returns authResponse

                val objectMapper = ObjectMapper()

                result =
                    mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/v1/auth")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(authRequest)),
                    )
                        .andExpect(status().isOk)
                        .andExpect(jsonPath("$.accessToken").value("access-token"))
                        .andExpect(jsonPath("$.refreshToken").value("refresh-token"))
                        .andReturn()
            }

            @Test
            fun `stores access token to cookie`() {
                val setCookieHeaders = result.response.getHeaders("Set-Cookie")

                val accessTokenCookie = setCookieHeaders.find { it.startsWith("accessToken=") }
                assertThat(
                    accessTokenCookie,
                    allOf(
                        containsString("accessToken=access-token"),
                        containsString("Path=/"),
                        containsString("HttpOnly"),
                        containsString("Secure"),
                        containsString("SameSite=Lax"),
                        containsString("Max-Age=360000"),
                    ),
                )
            }

            @Test
            fun `stores refresh token to cookie`() {
                val setCookieHeaders = result.response.getHeaders("Set-Cookie")

                val refreshTokenCookie = setCookieHeaders.find { it.startsWith("refreshToken=") }
                assertThat(
                    refreshTokenCookie,
                    allOf(
                        containsString("refreshToken=refresh-token"),
                        containsString("Path=/api/v1/refresh"),
                        containsString("HttpOnly"),
                        containsString("Secure"),
                        containsString("SameSite=Lax"),
                        containsString("Max-Age=8640000"),
                    ),
                )
            }
        }
    }

    @Nested
    @DisplayName("POST /api/v1/auth/status")
    inner class GetApiV1AuthStatus {
        private val email = "john-doe@example.com"
        private val token = "myToken"

        @BeforeEach
        fun setUp() {
            mockMvc =
                MockMvcBuilders.standaloneSetup(
                    AuthController(
                        stubAuthService,
                        userDetailsService,
                        tokenService,
                        stubJwtProperties,
                        false,
                    ),
                ).build()
        }

        @Test
        fun `returns true when user is logged in`() {
            every { tokenService.extractEmail(token) } returns email
            every { userDetailsService.loadUserByUsername(email) } returns User(email, "password", listOf())
            every { tokenService.isValid(token, any()) } returns true

            val cookie = Cookie("accessToken", token)

            mockMvc.perform(
                get("/api/v1/auth/status").cookie(cookie),
            )
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.authed").value(true))
        }

        @Test
        fun `returns false when accessToken cookie is missing`() {
            mockMvc.perform(get("/api/v1/auth/status"))
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.authed").value(false))
        }

        @Test
        fun `returns false when accessToken is invalid`() {
            every { tokenService.extractEmail(token) } returns email
            every { userDetailsService.loadUserByUsername(email) } returns User(email, "password", listOf())
            every { tokenService.isValid(token, any()) } returns false

            val cookie = Cookie("accessToken", token)

            mockMvc.perform(get("/api/v1/auth/status").cookie(cookie))
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.authed").value(false))
        }
    }

    @Test
    fun refreshAccessToken() {
    }
}
