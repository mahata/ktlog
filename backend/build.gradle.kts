import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.jlleitschuh.gradle.ktlint.reporter.ReporterType

plugins {
    id("org.springframework.boot") version "3.2.3"
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("jvm") version "1.9.23"
    kotlin("plugin.spring") version "1.9.23"
    kotlin("plugin.jpa") version "1.9.23"
    id("org.jlleitschuh.gradle.ktlint") version "12.1.0"
}

group = "org.mahata.render"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-cache")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")

    implementation("org.jetbrains.kotlin:kotlin-reflect:1.9.23")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.17.0")
    implementation("org.flywaydb:flyway-core:10.11.0")
    implementation("org.flywaydb:flyway-database-postgresql:10.10.0")
    implementation("com.github.ben-manes.caffeine:caffeine:3.1.8")

    runtimeOnly("org.postgresql:postgresql:42.7.2")
    runtimeOnly("com.h2database:h2:2.2.224")
    testImplementation("io.mockk:mockk:1.13.10")
    testImplementation("com.ninja-squad:springmockk:4.0.2")

    testRuntimeOnly("org.junit.platform:junit-platform-launcher:1.10.2")
}

tasks.withType<KotlinCompile> {
    val lintOption: String =
        if (System.getenv("GITHUB_WORKFLOW") == null) {
            "ktlintFormat"
        } else {
            "ktlintCheck"
        }
    dependsOn(lintOption)

    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "21"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
    jvmArgs("--add-opens", "java.base/java.util=ALL-UNNAMED") // to mock static methods in the java.util.UUID class
}

ktlint {
    verbose.set(true)
    outputToConsole.set(true)
    reporters {
        reporter(ReporterType.CHECKSTYLE)
    }
}
