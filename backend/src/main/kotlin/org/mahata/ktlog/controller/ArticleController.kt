package org.mahata.ktlog.controller

import org.mahata.ktlog.service.Article
import org.mahata.ktlog.service.ArticleService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import java.util.UUID

data class ArticleRequest(
    val title: String,
    val content: String,
)

@RestController
@RequestMapping("/api/v1/articles")
class ArticleController(
    private val articlesService: ArticleService,
) {
    @GetMapping
    fun getAll(): List<Article> {
        return articlesService.getArticles()
    }

    @GetMapping("/{id}")
    fun get(
        @PathVariable id: UUID,
    ): Article? {
        return articlesService.getArticle(id) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun save(
        @RequestBody request: ArticleRequest,
    ) {
        articlesService.saveArticle(request)
    }
}
