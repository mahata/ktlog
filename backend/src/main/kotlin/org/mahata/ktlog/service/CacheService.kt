package org.mahata.ktlog.service

import org.springframework.cache.CacheManager
import org.springframework.stereotype.Service

@Service
class CacheService(
    private val cacheManager: CacheManager,
) {
    fun invalidateCache(cacheName: String) {
        cacheManager.getCache(cacheName)?.clear()
    }
}
