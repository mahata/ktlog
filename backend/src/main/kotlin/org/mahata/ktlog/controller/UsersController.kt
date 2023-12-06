package org.mahata.ktlog.controller

import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class UserResponse(
    val name: String? = null,
    val email: String? = null,
)

@RestController
@RequestMapping("/api/v1/users")
class UsersController {
    @GetMapping("/me")
    fun me(
        @AuthenticationPrincipal user: OAuth2User?,
    ): UserResponse {
        return UserResponse(
            name = user?.attributes?.get("name") as? String,
            email = user?.attributes?.get("email") as? String,
        )
    }
}
