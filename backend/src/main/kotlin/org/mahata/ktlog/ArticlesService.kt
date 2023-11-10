package org.mahata.ktlog

import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import java.util.*

data class Article(
    val id: UUID,
    val title: String,
    val content: String
)

interface ArticlesService {
    fun getArticles(): List<Article>
    fun getArticle(id: UUID): Article?
    fun saveArticle(article: ArticlesRequest)
}

@Service
class ArticlesServiceImpl(
    private val articlesRepository: ArticlesRepository
) : ArticlesService {
    @Cacheable("getArticles")
    override fun getArticles(): List<Article> {
        return articlesRepository.findAll().map { Article(it.id!!, it.title, it.content) }
    }

    @Cacheable("getArticle")
    override fun getArticle(id: UUID): Article? {
        val articleEntity = articlesRepository.findById(id)
        return articleEntity.map { Article(it.id!!, it.title, it.content) }.orElse(null)
    }

    override fun saveArticle(article: ArticlesRequest) {
        articlesRepository.save(ArticlesEntity(title = article.title, content = article.content))
    }
}
