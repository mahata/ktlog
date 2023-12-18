package org.mahata.ktlog.controller

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.oauth2.core.user.DefaultOAuth2User
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @Test
    fun `When the user is not authorized, it returns null values`() {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users/me"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(null))
            .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(null))
    }

    @Test
    fun `When the user is authorized, it returns the user info`() {
        val user =
            DefaultOAuth2User(
                emptyList(),
                mapOf("name" to "Yasunori", "email" to "mahata777@gmail.com"),
                "name",
            )

        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/v1/users/me")
                .with(SecurityMockMvcRequestPostProcessors.oauth2Login().oauth2User(user)),
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Yasunori"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("mahata777@gmail.com"))
    }
}
