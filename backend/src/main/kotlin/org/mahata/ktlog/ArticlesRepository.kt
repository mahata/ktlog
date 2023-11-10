package org.mahata.ktlog

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.data.repository.CrudRepository
import java.util.UUID

@Entity
@Table(name = "articles")
class ArticlesEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    var id: UUID? = null,
    var title: String,
    var content: String
)

interface ArticlesRepository : CrudRepository<ArticlesEntity, UUID>
