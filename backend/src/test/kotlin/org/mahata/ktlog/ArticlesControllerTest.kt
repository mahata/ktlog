package org.mahata.ktlog

import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import java.util.*

@ExtendWith(MockKExtension::class)
class ArticlesControllerTest {

    @MockK
    lateinit var stubArticlesService: ArticlesService

    @Nested
    @DisplayName("GET /api/v1/articles")
    inner class GetApiV1Articles {
        @Test
        fun `It returns all articles available`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticlesService.getArticles()
            } returns listOf(Article(uuid, "title", "content"))

            val mockMvc = MockMvcBuilders.standaloneSetup(ArticlesController(stubArticlesService)).build()

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
        fun `It returns an article specified by ID that exists`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticlesService.getArticle(uuid)
            } returns Article(uuid, "title", "content")

            val mockMvc = MockMvcBuilders.standaloneSetup(ArticlesController(stubArticlesService)).build()

            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/articles/$uuid"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(uuid.toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("title"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").value("content"))
        }

        @Test
        fun `It returns 404 if the article specified by ID doesn't exist`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticlesService.getArticle(uuid)
            } returns null

            val mockMvc = MockMvcBuilders.standaloneSetup(ArticlesController(stubArticlesService)).build()

            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/articles/$uuid"))
                .andExpect(MockMvcResultMatchers.status().isNotFound)
        }
    }
}
