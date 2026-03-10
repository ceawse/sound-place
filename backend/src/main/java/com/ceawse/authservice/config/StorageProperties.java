package com.ceawse.authservice.infrastructure.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app.upload")
@Getter
@Setter
public class StorageProperties {
    private String dir = "./uploads/tracks";
}