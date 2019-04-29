package org.inventory.com.controller;

import java.net.URI;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.inventory.com.entity.Ledger;
import org.inventory.com.repository.LedgerRepository;
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

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/walton")
public class LedgerController {

	@Autowired
	public LedgerRepository ledgerRepository; 
	
	 
	@GetMapping("/ledger")
	public List<Ledger> getAllLedger(){
		return (List<Ledger>) ledgerRepository.findAll();
	} 
	
	@GetMapping("/ledger/{id}")
	public Ledger getLedger(@PathVariable long id){
		return ledgerRepository.findById(id);
	}
	
	@GetMapping("/ledgerbydate/strDate={strDate}&endDate={endDate}")
	public List<Ledger> getLedgerByDates(@PathVariable String strDate, @PathVariable String endDate){
		DateFormat format = new SimpleDateFormat("dd-MM-yyyy");
		
		Date strDateTime = new Date();
		Date endDateTime = new Date();
		try {
			strDateTime = format.parse(strDate);
			endDateTime = format.parse(endDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ledgerRepository.findAllWithinDates(strDateTime, endDateTime);
	}

	@RequestMapping(value = "/ledgerbydate/get", params = { "page", "size", "strDate",
			"endDate" }, method = RequestMethod.GET)
	public Page<Ledger> findPaginated(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam String strDate, @RequestParam String endDate) {
		DateFormat format = new SimpleDateFormat("dd-MM-yyyy");

		Date strDateTime = new Date();
		Date endDateTime = new Date();
		try {
			strDateTime = format.parse(strDate);
			endDateTime = format.parse(endDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Page<Ledger> resultPage = ledgerRepository.findAllWithinDatesPagination(strDateTime, endDateTime, PageRequest.of(page, size));
		if (page > resultPage.getTotalPages()) {
			System.out.println("Resource Not Found");
		}

		return resultPage;
	}

	@PostMapping("/save-ledger")
	public ResponseEntity<Void> createLedger(@RequestBody Ledger ledger){
		ledger.setUpdatedby("yusuf");
		Ledger ledgerCreated =  ledgerRepository.save(ledger);
		URI uri=ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(ledgerCreated.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@PutMapping("/edit-ledger/{id}")
	public ResponseEntity<Ledger> editLedger(@PathVariable long id, @RequestBody Ledger ledger){
		Ledger ledgerUpdated = ledgerRepository.save(ledger);
		return new ResponseEntity<Ledger>(ledger, HttpStatus.OK);
	}
	
	@GetMapping("/delete-ledger/{id}")
	   public void deleteLedger(@PathVariable(value = "id") Long id) throws Exception {
	       Ledger ledger = ledgerRepository.findById(id);
	       ledgerRepository.delete(ledger);
	       
	   }
}
