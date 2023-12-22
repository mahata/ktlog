package org.mahata.ktlog.service

import org.mahata.ktlog.controller.UserRequest
import org.mahata.ktlog.entity.UserEntity
import org.mahata.ktlog.exception.DuplicateEmailException
import org.mahata.ktlog.exception.DuplicateUnameException
import org.mahata.ktlog.repository.UserRepository
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
class UserServiceImpl(
    private val userRepository: UserRepository,
) : UserService {
    override fun getUserByEmail(email: String): User? {
        TODO("Not yet implemented")
    }

    override fun getUserByUname(uname: String): User? {
        TODO("Not yet implemented")
    }

    override fun saveUser(user: UserRequest) {
        userRepository.findByEmail(user.email)?.let {
            throw DuplicateEmailException("Duplicate email exists: ${user.email}")
        }

        userRepository.findByUname(user.uname)?.let {
            throw DuplicateUnameException("Duplicate uname exists: ${user.uname}")
        }

        val userEntity = UserEntity(user.email, user.uname)

        userRepository.save(userEntity)
    }
}
