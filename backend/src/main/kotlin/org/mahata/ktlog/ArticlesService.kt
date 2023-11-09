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
}

@Service
class ArticlesServiceImpl(
    private val articlesRepo: ArticlesRepository
) : ArticlesService {
    @Cacheable("getArticles")
    override fun getArticles(): List<Article> {
        return articlesRepo.findAll().map { Article(it.id, it.title, it.content) }
    }

    @Cacheable("getArticle")
    override fun getArticle(id: UUID): Article? {
        val articleEntity = articlesRepo.findById(id)
        return articleEntity.map { Article(it.id, it.title, it.content) }.orElse(null)
    }
}
