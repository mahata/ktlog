package org.mahata.render.demo

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HelloWorld {
    @GetMapping("/api/v1/hello")
    fun hello(): String {
        return "Hello, world!"
    }
}
