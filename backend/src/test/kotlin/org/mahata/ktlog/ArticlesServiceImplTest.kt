package org.mahata.ktlog

import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import io.mockk.mockkStatic
import io.mockk.unmockkStatic
import io.mockk.verify
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import java.util.Optional
import java.util.UUID

@ExtendWith(MockKExtension::class)
class ArticlesServiceImplTest {
    @MockK
    lateinit var stubArticleServiceRepository: ArticlesRepository

    @Nested
    @DisplayName("getArticles()")
    inner class GetArticles {
        @Test
        fun `getArticles() returns articles from repository`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticleServiceRepository.findAll()
            } returns listOf(
                ArticlesEntity(uuid, "title", "content")
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

    @Nested
    @DisplayName("getArticle(id)")
    inner class GetArticleId {
        @Test
        fun `getArticle(id) returns an article from repository if the id exists`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticleServiceRepository.findById(uuid)
            } returns Optional.of(ArticlesEntity(uuid, "title", "content"))

            val service = ArticlesServiceImpl(stubArticleServiceRepository)
            val result = service.getArticle(uuid)

            assertEquals(
                Article(uuid, "title", "content"),
                result
            )
        }

        @Test
        fun `getArticle(id) returns null if the id isn't available in the repository`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticleServiceRepository.findById(uuid)
            } returns Optional.empty()

            val service = ArticlesServiceImpl(stubArticleServiceRepository)
            val result = service.getArticle(uuid)

            assertNull(result)
        }
    }

    @Nested
    @DisplayName("saveArticle(request)")
    inner class SaveArticleRequest {
        @Test
        fun `saveArticle(request) saves an article`() {
            mockkStatic(UUID::class)
            val fixedUUID = UUID.fromString("123e4567-e89b-12d3-a456-426614174000")
            every { UUID.randomUUID() } returns fixedUUID

            val articlesRequest = ArticlesRequest("my title", "my content")
            every { stubArticleServiceRepository.save(any()) } answers { callOriginal() }

            val service = ArticlesServiceImpl(stubArticleServiceRepository)
            service.saveArticle(articlesRequest)

            verify {
                stubArticleServiceRepository.save(
                    withArg {
                        assertEquals(fixedUUID, it.id)
                        assertEquals("my title", it.title)
                        assertEquals("my content", it.content)
                    }
                )
            }
        }

        @AfterEach
        fun tearDown() {
            unmockkStatic(UUID::class)
        }
    }
}