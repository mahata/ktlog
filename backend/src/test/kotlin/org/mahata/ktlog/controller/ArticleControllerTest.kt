package org.mahata.ktlog.controller

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
import org.mahata.ktlog.service.Article
import org.mahata.ktlog.service.ArticleService
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import java.util.UUID

@ExtendWith(MockKExtension::class)
class ArticleControllerTest {
    @MockK
    private lateinit var stubArticleService: ArticleService

    private lateinit var mockMvc: MockMvc

    @BeforeEach
    fun setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(ArticleController(stubArticleService)).build()
    }

    @Nested
    @DisplayName("GET /api/v1/articles")
    inner class GetApiV1Articles {
        @Test
        fun `returns all articles available`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticleService.getArticles()
            } returns listOf(Article(uuid, "title", "content"))

            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/articles"))
                .andExpect(status().isOk)
                .andExpect(jsonPath("$").isArray)
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value(uuid.toString()))
                .andExpect(jsonPath("$[0].title").value("title"))
                .andExpect(jsonPath("$[0].content").value("content"))
        }
    }

    @Nested
    @DisplayName("GET /api/v1/articles/{id}")
    inner class GetApiV1ArticlesId {
        @Test
        fun `returns an existing article when ID is valid`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticleService.getArticle(uuid)
            } returns Article(uuid, "title", "content")

            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/articles/$uuid"))
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.id").value(uuid.toString()))
                .andExpect(jsonPath("$.title").value("title"))
                .andExpect(jsonPath("$.content").value("content"))
        }

        @Test
        fun `returns 404 when article with ID does not exist`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticleService.getArticle(uuid)
            } returns null

            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/articles/$uuid"))
                .andExpect(status().isNotFound)
        }
    }

    @Nested
    @DisplayName("POST /api/v1/articles")
    inner class PostApiV1Articles {
        @Test
        fun `saves a given article`() {
            val mockArticle = ArticleRequest("my title", "my content")

            every {
                stubArticleService.saveArticle(mockArticle)
            } returns Unit

            val objectMapper = ObjectMapper()
            val jsonBody = objectMapper.writeValueAsString(mockArticle)

            mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/articles")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonBody),
            ).andExpect(status().isCreated)

            verify(exactly = 1) {
                stubArticleService.saveArticle(ArticleRequest(mockArticle.title, mockArticle.content))
            }
        }
    }
}
