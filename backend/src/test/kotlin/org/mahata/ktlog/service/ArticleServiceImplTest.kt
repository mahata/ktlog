package org.mahata.ktlog.service

import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mahata.ktlog.controller.ArticleRequest
import org.mahata.ktlog.entity.ArticleEntity
import org.mahata.ktlog.entity.UserEntity
import org.mahata.ktlog.repository.ArticleRepository
import java.util.Optional
import java.util.UUID

@ExtendWith(MockKExtension::class)
class ArticleServiceImplTest {
    @MockK
    lateinit var stubArticleRepository: ArticleRepository

    @Nested
    @DisplayName("getArticles()")
    inner class GetArticles {
        @Test
        fun `getArticles() returns all articles from repository`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticleRepository.findAll()
            } returns
                listOf(
                    ArticleEntity(
                        uuid,
                        "title",
                        "content",
                        UserEntity("mahata", "mahata777@gmail.com"),
                    ),
                )

            val service = ArticleServiceImpl(stubArticleRepository)
            val result = service.getArticles()

            assertEquals(1, result.size)

            assertEquals(
                Article(uuid, "title", "content", "mahata"),
                result[0],
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
                stubArticleRepository.findById(uuid)
            } returns
                Optional.of(
                    ArticleEntity(
                        uuid,
                        "title",
                        "content",
                        UserEntity("mahata", "mahata777@gmail.com"),
                    ),
                )

            val articleService = ArticleServiceImpl(stubArticleRepository)
            val result = articleService.getArticle(uuid)

            assertEquals(
                Article(uuid, "title", "content", "mahata"),
                result,
            )
        }

        @Test
        fun `getArticle(id) returns null if the id isn't available in the repository`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticleRepository.findById(uuid)
            } returns Optional.empty()

            val service = ArticleServiceImpl(stubArticleRepository)
            val result = service.getArticle(uuid)

            assertNull(result)
        }
    }

    @Nested
    @DisplayName("saveArticle(request)")
    inner class SaveArticleRequest {
        @Test
        fun `saveArticle(request) saves an article`() {
            val articlesRequest = ArticleRequest("my title", "my content")
            every { stubArticleRepository.save(any()) } answers { callOriginal() }

            val service = ArticleServiceImpl(stubArticleRepository)
            service.saveArticle(articlesRequest)

            verify {
                stubArticleRepository.save(
                    withArg {
                        assertEquals("my title", it.title)
                        assertEquals("my content", it.content)
                    },
                )
            }
        }
    }

    @Nested
    @DisplayName("getArticlesByUname(uname)")
    inner class GetArticlesByUnameUname {
        @Test
        fun `getArticlesByUname(uname) returns all articles written by the user`() {
            val uuid = UUID.randomUUID()
            every {
                stubArticleRepository.findAllByUserUname("mahata")
            } returns
                listOf(
                    ArticleEntity(
                        uuid,
                        "title",
                        "content",
                        UserEntity("mahata", "mahata777@gmail.com"),
                    ),
                )

            val service = ArticleServiceImpl(stubArticleRepository)
            val result = service.getArticlesByUname("mahata")

            assertEquals(1, result.size)

            assertEquals(
                Article(uuid, "title", "content", "mahata"),
                result[0],
            )
        }
    }
}
