package org.inventory.com.repository;

import java.util.Date;
import java.util.List;

import org.inventory.com.entity.Expense;
import org.inventory.com.entity.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends PagingAndSortingRepository<Stock, Integer>{
	Stock findById(Long id);

	void deleteById(Long id);
	
	@Query(value = "select * from stock e",nativeQuery = true) 
    Page<Stock> findAllStocksPagination(Pageable pageable);
  
	@Query(value = "select * from stock s where s.category_name= ?1",nativeQuery = true)
	List<Stock> findAllByCategoryName(String category_name);
	
	@Query(value = "select * from stock s where s.category_name= ?1 AND s.product_name=?2",nativeQuery = true)
	Stock findAllByCategoryNameAndProductName(String category_name, String productName);
	  
}
