package com.group1.oopproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class OopProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(OopProjectApplication.class, args);
	}

	@GetMapping("/health")
	public String getHealth() {
		return "Working!";
	}

}
