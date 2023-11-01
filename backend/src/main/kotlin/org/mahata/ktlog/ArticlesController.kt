package org.mahata.ktlog

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/articles")
class ArticlesController(
    private val articlesService: ArticlesService
) {
    @GetMapping
    fun getAll(): List<Article> {
        return articlesService.getArticles()
    }
}
