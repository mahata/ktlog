package org.mahata.ktlog.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.mahata.ktlog.service.Article
import org.mahata.ktlog.service.ArticleService
import org.mahata.ktlog.service.User
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
import java.util.UUID

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockkBean
    private lateinit var stubUserService: UserService

    @MockkBean
    private lateinit var stubArticleService: ArticleService

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
        fun `returns null values when the user is not authorized`() {
            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users/me"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(null))
                .andExpect(MockMvcResultMatchers.jsonPath("$.uname").value(null))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(null))
        }

        @Test
        fun `returns user info when the user is authorized`() {
            every { stubUserService.getUserByEmail("mahata777@gmail.com") } returns null

            mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/users/me")
                    .with(SecurityMockMvcRequestPostProcessors.oauth2Login().oauth2User(defaultOAuth2User)),
            )
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Yasunori"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.uname").value(null))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("mahata777@gmail.com"))
        }

        @Test
        fun `returns user's uname when the user is authorized AND signed up`() {
            every { stubUserService.getUserByEmail("mahata777@gmail.com") } returns User("mahata", "mahata777@gmail.com")

            mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/users/me")
                    .with(SecurityMockMvcRequestPostProcessors.oauth2Login().oauth2User(defaultOAuth2User)),
            )
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Yasunori"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.uname").value("mahata"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("mahata777@gmail.com"))

            assertEquals(1, 1)
        }
    }

    @DisplayName("POST /api/v1/users")
    @Nested
    inner class PostApiV1Users {
        @Test
        fun `creates a new user when called with valid data `() {
            val mockSignUpRequest = UserRequest("mahata", "mahata777@gmail.com")

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
        fun `rejects the request when called without a CSRF token`() {
            val mockSignUpRequest = UserRequest("mahata", "mahata777@gmail.com")

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
        fun `rejects the request when the email address isn't the same as the OAuthed user's one`() {
            val mockSignUpRequest = UserRequest("mahata", "who-is-this@example.com")

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

    @DisplayName("GET /api/v1/users/{uname}/articles")
    @Nested
    inner class GetApiV1UsersUnameArticles {
        @Test
        fun `returns articles written by the user`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticleService.getArticlesByUname("mahata")
            } returns listOf(Article(uuid, "title", "content", "mahata"))

            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users/mahata/articles"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray)
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(uuid.toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].title").value("title"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].content").value("content"))
        }
    }
}
