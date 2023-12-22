package org.mahata.ktlog.repository

import org.mahata.ktlog.entity.UserEntity
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<UserEntity, String> {
    fun findByEmail(email: String): UserEntity?

    fun findByUname(uname: String): UserEntity?
}
