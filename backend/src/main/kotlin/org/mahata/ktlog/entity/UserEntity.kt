package org.mahata.ktlog.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "users")
class UserEntity(
    @Id
    val email: String,
    @Column(unique = true)
    val uname: String,
)
