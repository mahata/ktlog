package org.mahata.ktlog

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class KtlogApplication

fun main(args: Array<String>) {
    runApplication<KtlogApplication>(*args)
}
