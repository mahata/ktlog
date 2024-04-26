package org.mahata.ktlog.config

import org.mahata.ktlog.auth.OAuth2LoginSuccessHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
class SecurityConfig(
    private val oAuth2LoginSuccessHandler: OAuth2LoginSuccessHandler,
) {
    @Bean
    @Throws(Exception::class)
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .authorizeHttpRequests {
                it.requestMatchers("/signup").authenticated()
                it.requestMatchers("/api/v1/csrf").authenticated()
                it.anyRequest().permitAll()
            }
            .oauth2Login {
                it.defaultSuccessUrl("/")
                it.successHandler(oAuth2LoginSuccessHandler)
            }

        return http.build()
    }
}
