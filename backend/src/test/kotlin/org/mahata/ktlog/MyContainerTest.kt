package org.mahata.ktlog

import org.flywaydb.core.Flyway
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.containers.wait.strategy.Wait
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import org.testcontainers.utility.DockerImageName

@Testcontainers
class MyContainerTest {

    companion object {
        @Container
        private val postgreSQLContainer = PostgreSQLContainer(DockerImageName.parse("postgres:15.4-alpine3.18"))
            .waitingFor(Wait.forListeningPort())
    }

    @BeforeEach
    fun beforeEach() {
        Flyway.configure()
            .dataSource(postgreSQLContainer.jdbcUrl, postgreSQLContainer.username, postgreSQLContainer.password)
            .load()
            .migrate()
    }

    @Test
    fun `It's a meaningless test just to verify that Flyway migration works with @Testcontainers`() {
        assertTrue(true)
    }
}
