package org.mahata.ktlog.config

import org.springframework.cache.CacheManager
import org.springframework.cache.caffeine.CaffeineCacheManager
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class CacheConfiguration {
    @Bean
    fun cacheManager(): CacheManager {
        return CaffeineCacheManager()
    }
}
