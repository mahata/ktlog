package org.mahata.render.demo

import jakarta.persistence.Entity
import jakarta.persistence.Id
import org.springframework.data.repository.CrudRepository
import java.util.UUID

@Entity
class ArticleEntity(
    @Id
    var id: UUID,
    var title: String,
    var content: String
)

interface ArticlesRepository : CrudRepository<ArticleEntity, UUID>
