package org.inventory.com.controller;

import java.net.URI;
import java.util.List;

import org.inventory.com.entity.Expense;
import org.inventory.com.entity.ProductCategory;
import org.inventory.com.entity.Stock;
import org.inventory.com.repository.ProductCategoryRepository;
import org.inventory.com.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/walton")
public class StockController {

	@Autowired
	private StockRepository stockRepository;

	@Autowired
	private ProductCategoryRepository productCategoryRepository;
	
	@GetMapping("/stocks")
	public List<Stock> getAllStocks() {
		return (List<Stock>) stockRepository.findAll();
	}
	
	@GetMapping("/allstocks")
	public Page<Stock> findAllStocksPagination(@RequestParam("page") int page, @RequestParam("size") int size) {
		
		Page<Stock> resultPage = stockRepository.findAllStocksPagination(PageRequest.of(page, size));
		if (page > resultPage.getTotalPages()) {
			System.out.println("Resource Not Found");
		} 
		return resultPage;
	}
	
	@GetMapping("/stocks/{id}")
	public Stock getstock(@PathVariable Long id) {
		return stockRepository.findById(id);
	}
	
	@RequestMapping(value = "/stocksbycatname/get", params = { "productCategory"}, method = RequestMethod.GET)
	public List<Stock> getstockByCategory(@RequestParam String productCategory) {
		List<Stock> s = stockRepository.findAllByCategoryName(productCategory); 
		return (List<Stock>) stockRepository.findAllByCategoryName(productCategory);
	}
	
	@RequestMapping(value = "/stocksbycatnameAndPname/get", params = { "productCategory", "productName"}, method = RequestMethod.GET)
	public Stock getstockByCategoryAndProductName(@RequestParam String productCategory, @RequestParam String productName) {
		Stock stock = stockRepository.findAllByCategoryNameAndProductName(productCategory, productName); 
		return stock;
	}
	

	@PostMapping("/save-stocks")
	public ResponseEntity<Void> createStock(@RequestBody Stock stock) {
		System.out.println("=========save stock called "+stock.getProductCategory());
		Stock stockCreated = stockRepository.save(stock);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(stockCreated.getId())
				.toUri();
		return ResponseEntity.created(uri).build();
	}
 
	@PutMapping("/edit-stock/{id}")
	public ResponseEntity<Stock> editStock(@PathVariable long id, @RequestBody Stock stock) {
		System.out.println("====>> "+stock.getProductCategory());
		Stock stockUpdated = stockRepository.save(stock);
		return new ResponseEntity<Stock>(stock, HttpStatus.OK);
	}
 
	@PostMapping("/update-stock")  
	public void updatestockByCategoryAndProductName(@RequestBody Stock[] stock) {
		System.out.println("UPDTATE STOCK HFD"+stock.length);
		for(Stock s : stock) {
			Stock stockToUpdate = stockRepository.findAllByCategoryNameAndProductName(s.getProductCategory(), s.getProductName());
			stockToUpdate.setQuantity(stockToUpdate.getQuantity() - s.getQuantity());
			Stock stockUpdated = stockRepository.save(stockToUpdate); 
		}
	}
	
	@GetMapping("/delete-stocks/{id}")
	public void deleteStock(@PathVariable(value = "id") Long id) throws Exception {
		Stock stock = stockRepository.findById(id);
		stockRepository.delete(stock);
	}
}
