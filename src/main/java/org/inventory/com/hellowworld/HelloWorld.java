package org.inventory.com.hellowworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/walton")
public class HelloWorld {

	@GetMapping("/helloworld")
	public String getHelloWorld() {
		
		return "Hello World";
	}
	
	@GetMapping("/hello-world-bean")
	public String getHelloWorldBean() {
		return "Hello World";
	}
}
