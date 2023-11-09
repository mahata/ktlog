package org.mahata.ktlog

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HomeController {
    @GetMapping("/articles/*")
    fun forward(): String {
        return "forward:/"
    }
}
