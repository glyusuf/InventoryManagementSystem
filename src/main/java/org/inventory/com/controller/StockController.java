package org.inventory.com.controller;

import java.net.URI;
import java.util.List;

import org.inventory.com.entity.Stock;
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
public class StockController {

	@Autowired
	private StockRepository stockRepository;

	@GetMapping("/stocks")
	public List<Stock> getAllStocks() {
		return (List<Stock>) stockRepository.findAll();
	}

	@GetMapping("/stocks/{id}")
	public Stock getstock(@PathVariable Long id) {
		return stockRepository.findById(id);
	}

	@PostMapping("/save-stocks")
	public ResponseEntity<Void> createStock(@RequestBody Stock stock) {
		Stock stockCreated = stockRepository.save(stock);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(stockCreated.getId())
				.toUri();
		return ResponseEntity.created(uri).build();
	}

	@PutMapping("/edit-stock/{id}")
	public ResponseEntity<Stock> editStock(@PathVariable long id, @RequestBody Stock stock) {
		Stock stockUpdated = stockRepository.save(stock);
		return new ResponseEntity<Stock>(stock, HttpStatus.OK);
	}

	@GetMapping("/delete-stocks/{id}")
	public void deleteStock(@PathVariable(value = "id") Long id) throws Exception {
		Stock stock = stockRepository.findById(id);
		stockRepository.delete(stock);

	}
}
