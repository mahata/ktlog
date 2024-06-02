package org.mahata.ktlog.service

import org.mahata.ktlog.controller.ArticleRequest
import org.mahata.ktlog.entity.ArticleEntity
import org.mahata.ktlog.repository.ArticleRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import java.util.UUID

data class Article(
    val id: UUID,
    val title: String,
    val content: String,
)

interface ArticleService {
    fun getArticles(): List<Article>

    fun getArticle(id: UUID): Article?

    fun saveArticle(article: ArticleRequest)
}

@Service
class ArticleServiceImpl(
    private val articleRepository: ArticleRepository,
) : ArticleService {
    @Cacheable("getArticles")
    override fun getArticles(): List<Article> {
        return articleRepository.findAll().map {
            Article(
                it.id!!,
                it.title,
                it.content,
            )
        }
    }

    @Cacheable("getArticle")
    override fun getArticle(id: UUID): Article? {
        val articleEntity = articleRepository.findById(id)
        return articleEntity.map {
            Article(
                it.id!!,
                it.title,
                it.content,
            )
        }.orElse(null)
    }

    override fun saveArticle(article: ArticleRequest) {
        articleRepository.save(
            ArticleEntity(
                title = article.title,
                content = article.content,
            ),
        )
    }
}
