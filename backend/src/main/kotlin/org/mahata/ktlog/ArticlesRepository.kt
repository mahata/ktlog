package org.mahata.ktlog

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.data.repository.CrudRepository
import java.util.UUID

@Entity
@Table(name = "articles")
class ArticlesEntity(
    @Id
    var id: UUID,
    var title: String,
    var content: String
)

interface ArticlesRepository : CrudRepository<ArticlesEntity, UUID>
