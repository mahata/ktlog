package org.mahata.ktlog.repository

import org.mahata.ktlog.data.AppUser
import org.mahata.ktlog.data.Role
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
class UserRepository(
    private val encoder: PasswordEncoder,
) {
    private val users =
        setOf(
            AppUser(
                id = UUID.randomUUID(),
                email = "mahata777@gmail.com",
                password = encoder.encode("password"),
                role = Role.ADMIN,
            ),
            AppUser(
                id = UUID.randomUUID(),
                email = "dummy@example.com",
                password = encoder.encode("password"),
                role = Role.USER,
            ),
        )

    fun findByEmail(email: String): AppUser? = users.firstOrNull { it.email == email }
}
