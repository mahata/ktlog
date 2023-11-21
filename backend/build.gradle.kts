import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.jlleitschuh.gradle.ktlint.reporter.ReporterType

plugins {
    id("org.springframework.boot") version "3.1.4"
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("jvm") version "1.9.20"
    kotlin("plugin.spring") version "1.9.20"
    kotlin("plugin.jpa") version "1.9.20"
    id("org.jlleitschuh.gradle.ktlint") version "11.6.1"
}

group = "org.mahata.render"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
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

    implementation("org.jetbrains.kotlin:kotlin-reflect:1.9.20")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.16.0")
    implementation("org.flywaydb:flyway-core:9.22.3")
    implementation("com.github.ben-manes.caffeine:caffeine:3.1.8")

    runtimeOnly("org.postgresql:postgresql:42.7.0")
    runtimeOnly("com.h2database:h2:2.2.224")
    testImplementation("io.mockk:mockk:1.13.8")
}

tasks.withType<KotlinCompile> {
    val lintOption: String = if (System.getenv("GITHUB_WORKFLOW") == null) {
        "ktlintFormat"
    } else {
        "ktlintCheck"
    }
    dependsOn(lintOption)

    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "17"
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
