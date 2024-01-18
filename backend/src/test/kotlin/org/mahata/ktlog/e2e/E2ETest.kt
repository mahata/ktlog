package org.mahata.ktlog.e2e

import com.microsoft.playwright.Playwright
import org.junit.jupiter.api.Test

class E2ETest {
    @Test
    fun `Note - It's not a real test`() {
        val playwright = Playwright.create()
        val browser = playwright.chromium().launch()
        val page = browser.newPage()

        page.navigate("https://playwright.dev")
        println(page.title())
    }
}
