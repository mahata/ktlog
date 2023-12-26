package org.mahata.ktlog.controller

import org.springframework.security.web.csrf.CsrfToken
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/csrf")
class CsrfController {
    @GetMapping
    fun csrf(token: CsrfToken): CsrfToken {
        return token
    }
}
