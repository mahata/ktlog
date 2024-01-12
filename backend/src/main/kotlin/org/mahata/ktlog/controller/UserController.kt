package org.mahata.ktlog.controller

import org.mahata.ktlog.service.Article
import org.mahata.ktlog.service.ArticleService
import org.mahata.ktlog.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

data class UserResponse(
    val uname: String? = null,
    val email: String? = null,
    val name: String? = null,
)

data class UserRequest(
    val uname: String,
    val email: String,
)

@RestController
@RequestMapping("/api/v1/users")
class UserController(
    private val userService: UserService,
    private val articleService: ArticleService,
) {
    @GetMapping("/me")
    fun me(
        @AuthenticationPrincipal oAuth2User: OAuth2User?,
    ): UserResponse {
        val email = oAuth2User?.attributes?.get("email") as? String
        val uname = email?.let { userService.getUserByEmail(it)?.uname }

        return UserResponse(
            uname,
            email,
            name = oAuth2User?.attributes?.get("name") as? String,
        )
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun post(
        @AuthenticationPrincipal oAuth2User: OAuth2User?,
        @RequestBody signUpRequest: UserRequest,
    ) {
        val email = oAuth2User?.attributes?.get("email") as? String
        if (email == null || email != signUpRequest.email) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN)
        }

        userService.saveUser(signUpRequest)
    }

    @GetMapping("/{uname}/articles")
    fun getAll(
        @PathVariable uname: String,
    ): List<Article> {
        return articleService.getArticlesByUname(uname)
    }
}
