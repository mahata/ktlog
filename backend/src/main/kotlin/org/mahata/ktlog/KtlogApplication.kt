package org.mahata.ktlog

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching

@EnableCaching
@SpringBootApplication
class KtlogApplication

fun main(args: Array<String>) {
    runApplication<KtlogApplication>(*args)
}
