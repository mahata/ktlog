package org.mahata.ktlog.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.mahata.ktlog.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.security.oauth2.core.user.DefaultOAuth2User
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockkBean
    private lateinit var stubUserService: UserService

    private val defaultOAuth2User =
        DefaultOAuth2User(
            emptyList(),
            mapOf("name" to "Yasunori", "email" to "mahata777@gmail.com"),
            "name",
        )

    @DisplayName("GET /api/v1/users/me")
    @Nested
    inner class GetApiV1UsersMe {
        @Test
        fun `When the user is not authorized, it returns null values`() {
            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users/me"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(null))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(null))
        }

        @Test
        fun `When the user is authorized, it returns the user info`() {
            mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/users/me")
                    .with(SecurityMockMvcRequestPostProcessors.oauth2Login().oauth2User(defaultOAuth2User)),
            )
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Yasunori"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("mahata777@gmail.com"))
        }
    }

    @DisplayName("POST /api/v1/users")
    @Nested
    inner class PostApiV1Users {
        @Test
        fun `When called with valid data, it creates a new user`() {
            val mockSignUpRequest = UserRequest("mahata777@gmail.com", "mahata")

            every { stubUserService.saveUser(mockSignUpRequest) } returns Unit

            val objectMapper = ObjectMapper()
            val jsonBody = objectMapper.writeValueAsString(mockSignUpRequest)

            mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/users")
                    .with(SecurityMockMvcRequestPostProcessors.oauth2Login().oauth2User(defaultOAuth2User))
                    .with(SecurityMockMvcRequestPostProcessors.csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonBody),
            ).andExpect(MockMvcResultMatchers.status().isCreated)

            verify(exactly = 1) {
                stubUserService.saveUser(mockSignUpRequest)
            }
        }

        @Test
        fun `When called without a CSRF token, it rejects the request`() {
            val mockSignUpRequest = UserRequest("mahata777@gmail.com", "mahata")

            every { stubUserService.saveUser(mockSignUpRequest) } returns Unit

            val objectMapper = ObjectMapper()
            val jsonBody = objectMapper.writeValueAsString(mockSignUpRequest)

            mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/users")
                    .with(SecurityMockMvcRequestPostProcessors.oauth2Login().oauth2User(defaultOAuth2User))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonBody),
            ).andExpect(MockMvcResultMatchers.status().isForbidden)
        }

        @Test
        fun `When the email address isn't the same as the OAuthed user's one, it rejects the request`() {
            val mockSignUpRequest = UserRequest("who-is-this@example.com", "mahata")

            every { stubUserService.saveUser(mockSignUpRequest) } returns Unit

            val objectMapper = ObjectMapper()
            val jsonBody = objectMapper.writeValueAsString(mockSignUpRequest)

            mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/users")
                    .with(SecurityMockMvcRequestPostProcessors.oauth2Login().oauth2User(defaultOAuth2User))
                    .with(SecurityMockMvcRequestPostProcessors.csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonBody),
            ).andExpect(MockMvcResultMatchers.status().isForbidden)
        }
    }
}
