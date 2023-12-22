package org.mahata.ktlog.controller

import org.mahata.ktlog.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

data class UserResponse(
    val name: String? = null,
    val email: String? = null,
)

data class UserRequest(
    val email: String,
    val uname: String,
)

@RestController
@RequestMapping("/api/v1/users")
class UserController(
    private val userService: UserService,
) {
    @GetMapping("/me")
    fun me(
        @AuthenticationPrincipal user: OAuth2User?,
    ): UserResponse {
        return UserResponse(
            name = user?.attributes?.get("name") as? String,
            email = user?.attributes?.get("email") as? String,
        )
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun post(
        @AuthenticationPrincipal user: OAuth2User?,
        @RequestBody signUpRequest: UserRequest,
    ) {
        userService.saveUser(signUpRequest)
    }
}
