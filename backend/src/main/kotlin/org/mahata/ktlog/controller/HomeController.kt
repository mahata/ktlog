package org.mahata.ktlog.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HomeController {
    @GetMapping("/articles/*", "/signup")
    fun forward(): String {
        return "forward:/"
    }
}
