package org.mahata.ktlog.service

import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import io.mockk.verify
import org.junit.jupiter.api.Assertions
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

@ExtendWith(MockKExtension::class)
class UserServiceImplTest {
    @MockK
    lateinit var stubUserRepository: UserRepository

    @Nested
    @DisplayName("saveUser(newUser)")
    inner class SaveUserNewUser {
        @Test
        fun `signup with unique email and uname works`() {
            val email = "mahata777@gmail.com"
            val uname = "existingUser"
            val newUser = UserRequest(email, uname)

            every { stubUserRepository.findByEmail(email) } returns null
            every { stubUserRepository.findByUname(uname) } returns null
            every { stubUserRepository.save(any()) } returns UserEntity(email, uname)

            val userService = UserServiceImpl(stubUserRepository)
            userService.saveUser(newUser)

            verify(exactly = 1) { stubUserRepository.findByUname(uname) }
            verify(exactly = 1) { stubUserRepository.findByEmail(email) }
            verify(exactly = 1) { stubUserRepository.save(any()) }
        }

        @Test
        fun `signup with duplicate email throws exception`() {
            val email = "existing-user@example.com"
            val uname = "mahata"
            val newUser = UserRequest(email, uname)

            every { stubUserRepository.findByEmail(email) } returns UserEntity(email, uname)
            every { stubUserRepository.findByUname(uname) } returns null

            val userService = UserServiceImpl(stubUserRepository)

            val exception =
                assertThrows<DuplicateEmailException> {
                    userService.saveUser(newUser)
                }
            Assertions.assertEquals("Duplicate email exists: existing-user@example.com", exception.message)

            verify(exactly = 1) { stubUserRepository.findByEmail(email) }
        }

        @Test
        fun `signup with duplicate username throws exception`() {
            val email = "mahata777@gmail.com"
            val uname = "existing-user"
            val newUser = UserRequest(email, uname)

            every { stubUserRepository.findByEmail(email) } returns null
            every { stubUserRepository.findByUname(uname) } returns UserEntity(email, uname)

            val userService = UserServiceImpl(stubUserRepository)

            val exception =
                assertThrows<DuplicateUnameException> {
                    userService.saveUser(newUser)
                }
            Assertions.assertEquals("Duplicate uname exists: existing-user", exception.message)

            verify(exactly = 1) { stubUserRepository.findByUname(uname) }
        }
    }
}
