package org.mahata.ktlog.data

import java.util.UUID

enum class Role {
    USER,
    ADMIN,
}

data class AppUser(
    val id: UUID,
    val email: String,
    val password: String,
    val role: Role,
)
