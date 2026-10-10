package com.example.demo;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
@Configuration
public class db {
    @Bean
    public static DataSource source(){
        DriverManagerDataSource dmds = new DriverManagerDataSource();
        dmds.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dmds.setUrl("jdbc:mysql://localhost:3306/palacinkarnica2026");
        dmds.setUsername("root");
        dmds.setPassword(System.getenv().getOrDefault("DB_PASSWORD", "12345678"));

        return dmds;
    }
}
