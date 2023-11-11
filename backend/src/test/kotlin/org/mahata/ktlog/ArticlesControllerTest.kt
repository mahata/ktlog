package org.mahata.ktlog

import com.fasterxml.jackson.databind.ObjectMapper
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import io.mockk.verify
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import java.util.UUID

@ExtendWith(MockKExtension::class)
class ArticlesControllerTest {

    @MockK
    private lateinit var stubArticlesService: ArticlesService

    private lateinit var mockMvc: MockMvc

    @BeforeEach
    fun setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(ArticlesController(stubArticlesService)).build()
    }

    @Nested
    @DisplayName("GET /api/v1/articles")
    inner class GetApiV1Articles {
        @Test
        fun `It returns all articles available`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticlesService.getArticles()
            } returns listOf(Article(uuid, "title", "content"))

            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/articles"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray)
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(uuid.toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].title").value("title"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].content").value("content"))
        }
    }

    @Nested
    @DisplayName("GET /api/v1/articles/{id}")
    inner class GetApiV1ArticlesId {
        @Test
        fun `It returns an existing article when ID is valid`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticlesService.getArticle(uuid)
            } returns Article(uuid, "title", "content")

            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/articles/$uuid"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(uuid.toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("title"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").value("content"))
        }

        @Test
        fun `It returns 404 when article with ID does not exist`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticlesService.getArticle(uuid)
            } returns null

            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/articles/$uuid"))
                .andExpect(MockMvcResultMatchers.status().isNotFound)
        }
    }

    @Nested
    @DisplayName("POST /api/v1/articles")
    inner class PostApiV1Articles {
        @Test
        fun `It saves a given article`() {
            val mockArticle = ArticlesRequest("my title", "my content")

            every {
                stubArticlesService.saveArticle(mockArticle)
            } returns Unit

            val objectMapper = ObjectMapper()
            val jsonBody = objectMapper.writeValueAsString(mockArticle)

            mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/articles")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonBody)
            ).andExpect(MockMvcResultMatchers.status().isCreated)

            verify(exactly = 1) {
                stubArticlesService.saveArticle(ArticlesRequest(mockArticle.title, mockArticle.content))
            }
        }
    }
}
