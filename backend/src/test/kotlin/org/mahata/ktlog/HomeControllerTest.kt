package org.mahata.ktlog

import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import java.util.*

@ExtendWith(MockKExtension::class)
class HomeControllerTest {

    private lateinit var mockMvc: MockMvc

    @BeforeEach
    fun setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(HomeController()).build()
    }

    @Test
    fun `each article page is handled by root index`() {
        mockMvc.perform(get("/articles/${UUID.randomUUID()}"))
            .andExpect(status().isOk)
            .andExpect(forwardedUrl("/"))
    }
}
