package org.mahata.render.demo

import org.springframework.stereotype.Service
import java.util.*

data class Article(
    val id: UUID,
    val title: String,
    val content: String
)

interface ArticlesService {
    fun getArticles(): List<Article>
}

@Service
class ArticlesServiceImpl(
    private val articlesRepo: ArticlesRepository
) : ArticlesService {
    override fun getArticles(): List<Article> {
        return articlesRepo.findAll().map { Article(it.id, it.title, it.content) }
    }
}