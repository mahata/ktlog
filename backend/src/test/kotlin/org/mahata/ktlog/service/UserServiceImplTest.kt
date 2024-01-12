package org.mahata.ktlog.service

import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.api.extension.ExtendWith
import org.mahata.ktlog.controller.UserRequest
import org.mahata.ktlog.entity.UserEntity
import org.mahata.ktlog.exception.DuplicateEmailException
import org.mahata.ktlog.exception.DuplicateUnameException
import org.mahata.ktlog.repository.UserRepository
import java.util.Optional

@ExtendWith(MockKExtension::class)
class UserServiceImplTest {
    @MockK
    lateinit var stubUserRepository: UserRepository

    @Nested
    @DisplayName("getUserByEmail")
    inner class GetUserByEmail {
        @Test
        fun `get user data given an email`() {
            val uname = "mahata"
            val email = "mahata777@gmail.com"

            every { stubUserRepository.findByEmail(email) } returns UserEntity(uname, email)

            val userService = UserServiceImpl(stubUserRepository)
            val user = userService.getUserByEmail(email)

            assertEquals("mahata", user?.uname)
            assertEquals("mahata777@gmail.com", user?.email)

            verify(exactly = 1) { stubUserRepository.findByEmail(email) }
        }
    }

    @Nested
    @DisplayName("saveUser(newUser)")
    inner class SaveUserNewUser {
        @Test
        fun `signup with unique email and uname works`() {
            val uname = "mahata"
            val email = "mahata777@gmail.com"
            val newUser = UserRequest(uname, email)

            every { stubUserRepository.findById(uname) } returns Optional.empty()
            every { stubUserRepository.findByEmail(email) } returns null
            every { stubUserRepository.save(any()) } returns UserEntity(uname, email)

            val userService = UserServiceImpl(stubUserRepository)
            userService.saveUser(newUser)

            verify(exactly = 1) { stubUserRepository.findById(uname) }
            verify(exactly = 1) { stubUserRepository.findByEmail(email) }
            verify(exactly = 1) { stubUserRepository.save(any()) }
        }

        @Test
        fun `signup with duplicate uname throws exception`() {
            val uname = "existing-user"
            val email = "mahata777@gmail.com"
            val newUser = UserRequest(uname, email)

            every { stubUserRepository.findById(uname) } returns Optional.of(UserEntity(uname, email))
            every { stubUserRepository.findByEmail(email) } returns null

            val userService = UserServiceImpl(stubUserRepository)

            val exception =
                assertThrows<DuplicateEmailException> {
                    userService.saveUser(newUser)
                }
            assertEquals("Duplicate uname exists: existing-user", exception.message)

            verify(exactly = 1) { stubUserRepository.findById(uname) }
        }

        @Test
        fun `signup with duplicate email throws exception`() {
            val uname = "existing-user"
            val email = "existing-user@example.com"
            val newUser = UserRequest(uname, email)

            every { stubUserRepository.findById(uname) } returns Optional.empty()
            every { stubUserRepository.findByEmail(email) } returns UserEntity(uname, email)

            val userService = UserServiceImpl(stubUserRepository)

            val exception =
                assertThrows<DuplicateUnameException> {
                    userService.saveUser(newUser)
                }
            assertEquals("Duplicate email exists: existing-user@example.com", exception.message)

            verify(exactly = 1) { stubUserRepository.findByEmail(email) }
        }
    }
}
