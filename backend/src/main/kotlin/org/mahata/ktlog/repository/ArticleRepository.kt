package org.mahata.ktlog.repository

import org.mahata.ktlog.entity.ArticleEntity
import org.springframework.data.repository.CrudRepository
import java.util.UUID

interface ArticleRepository : CrudRepository<ArticleEntity, UUID> {
    fun findAllByUserUname(uname: String): List<ArticleEntity>
}
