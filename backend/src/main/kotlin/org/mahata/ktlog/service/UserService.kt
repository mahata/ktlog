package org.mahata.ktlog.service

import org.mahata.ktlog.controller.UserRequest
import org.springframework.stereotype.Service

data class User(
    val email: String,
    val uname: String,
)

interface UserService {
    fun getUserByEmail(email: String): User?

    fun getUserByUname(uname: String): User?

    fun saveUser(user: UserRequest)
}

@Service
class UserServiceImpl : UserService {
    override fun getUserByEmail(email: String): User? {
        TODO("Not yet implemented")
    }

    override fun getUserByUname(uname: String): User? {
        TODO("Not yet implemented")
    }

    override fun saveUser(user: UserRequest) {
        TODO("Not yet implemented")
    }
}
