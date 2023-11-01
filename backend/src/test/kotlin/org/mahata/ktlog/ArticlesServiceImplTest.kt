package org.mahata.ktlog

import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import java.util.*

@ExtendWith(MockKExtension::class)
class ArticlesServiceImplTest {
    @MockK
    lateinit var stubArticleServiceRepository: ArticlesRepository

    @Test
    fun `getArticles() returns articles from repository`() {
        val uuid = UUID.randomUUID()
        every {
            stubArticleServiceRepository.findAll()
        } returns listOf(
            ArticleEntity(uuid, "title", "content")
        )

        val service = ArticlesServiceImpl(stubArticleServiceRepository)
        val result = service.getArticles()

        assertEquals(1, result.size)

        assertEquals(
            Article(uuid, "title", "content"),
            result[0]
        )
    }
}
