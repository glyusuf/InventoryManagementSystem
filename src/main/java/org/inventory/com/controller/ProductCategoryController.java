package org.inventory.com.controller;

import java.net.URI;
import java.util.List;

import org.inventory.com.entity.ProductCategory;
import org.inventory.com.entity.Stock;
import org.inventory.com.repository.ProductCategoryRepository;
import org.inventory.com.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/walton")
public class ProductCategoryController {

	@Autowired
	private ProductCategoryRepository productCategoryRepository;

	@GetMapping("/category")
	public List<ProductCategory> getAllCategory() {
		return (List<ProductCategory>) productCategoryRepository.findAll();
	}

	@GetMapping("/category/{id}")
	public ProductCategory getCategory(@PathVariable Long id) {
		return productCategoryRepository.findById(id);
	}

	@PostMapping("/save-category")
	public ResponseEntity<Void> createStock(@RequestBody ProductCategory category) {
		category.setUpdatedby("yusuf");
		ProductCategory categoryCreated = productCategoryRepository.save(category);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(categoryCreated.getId())
				.toUri();
		return ResponseEntity.created(uri).build();
	}

	@PutMapping("/edit-category/{id}")
	public ResponseEntity<ProductCategory> editCategory(@PathVariable long id, @RequestBody ProductCategory category) {
		ProductCategory categoryUpdated = productCategoryRepository.save(category);
		return new ResponseEntity<ProductCategory>(category, HttpStatus.OK);
	}

	@GetMapping("/delete-category/{id}")
	public void deleteStock(@PathVariable(value = "id") Long id) throws Exception {
		ProductCategory stock = productCategoryRepository.findById(id);
		productCategoryRepository.delete(stock);
	}
}
