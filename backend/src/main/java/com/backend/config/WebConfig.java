package com.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    
    @Bean
    WebMvcConfigurer corsConfiguration() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings( CorsRegistry registry) {
                registry.addMapping("/**")  // allow all endpoints
                        .allowedOrigins("http://localhost:5173")    // allow specific domain
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // allow methods
                        .allowedHeaders("*");
            }
        };
    }
}
