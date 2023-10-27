package org.mahata.render.demo

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
}
