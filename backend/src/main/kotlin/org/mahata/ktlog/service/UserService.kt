package org.mahata.ktlog.service

import org.mahata.ktlog.controller.UserRequest
import org.mahata.ktlog.entity.UserEntity
import org.mahata.ktlog.exception.DuplicateEmailException
import org.mahata.ktlog.exception.DuplicateUnameException
import org.mahata.ktlog.repository.UserRepository
import org.springframework.stereotype.Service

data class User(
    val uname: String,
    val email: String,
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
        return userRepository.findByEmail(email)?.let {
            User(it.uname, it.email)
        }
    }

    override fun getUserByUname(uname: String): User? {
        return userRepository.findById(uname).let {
            val userEntity = it.get()
            User(userEntity.uname, userEntity.email)
        }
    }

    override fun saveUser(user: UserRequest) {
        val dbUserByUname = userRepository.findById(user.uname)
        if (dbUserByUname.isPresent) {
            throw DuplicateEmailException("Duplicate uname exists: ${user.uname}")
        }

        userRepository.findByEmail(user.email)?.let {
            throw DuplicateUnameException("Duplicate email exists: ${user.email}")
        }

        val userEntity = UserEntity(user.uname, user.email)

        userRepository.save(userEntity)
    }
}
