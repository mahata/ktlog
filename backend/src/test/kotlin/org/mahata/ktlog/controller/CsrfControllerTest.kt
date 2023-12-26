package org.mahata.ktlog.controller

import org.hamcrest.Matchers.notNullValue
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class CsrfControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    @WithMockUser
    fun `get csrf should return valida data for authed users`() {
        mockMvc.perform(get("/api/v1/csrf"))
            .andExpect(status().isOk)
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.token").value(notNullValue()))
    }

    @Test
    fun `get csrf should return 3xx for authed users (for authorization)`() {
        mockMvc.perform(get("/api/v1/csrf"))
            .andExpect(status().is3xxRedirection)
    }
}
