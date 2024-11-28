package org.mahata.ktlog.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HomeController {
    @GetMapping("/articles/*", "/post", "/login")
    fun forward(): String {
        return "forward:/"
    }
}
