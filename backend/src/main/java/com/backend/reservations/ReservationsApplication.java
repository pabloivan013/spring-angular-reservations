package com.backend.reservations;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@SpringBootApplication
@EnableJpaAuditing
public class ReservationsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReservationsApplication.class, args);
	}

	// https://stackoverflow.com/a/43921334
	// Match everything without a suffix (so not a static resource)
	@RequestMapping(value = "/**/{path:[^.]*}")       
	public String redirect() {
		// Forward to home page so that route is preserved.(i.e forward:/intex.html)
		return "forward:/";
	}

}
