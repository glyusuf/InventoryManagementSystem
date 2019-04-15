package org.inventory.com.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.inventory.com.entity.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

@Repository
public interface ExpenseRepository extends PagingAndSortingRepository<Expense, Integer>{

	Expense findById(Long id); 
 
    @Query(value = "select * from expense e where e.expense_date between ?1 and ?2",nativeQuery = true) 
    List<Expense> findAllWithinDates(@Param("expense_date") Date strDateTime, @Param("expense_date") Date endDateTime);
    
    @Query(value = "select * from expense e where e.expense_date between ?1 and ?2",nativeQuery = true) 
    Page<Expense> findAllWithinDatesPagination(@Param("expense_date") Date strDateTime, @Param("expense_date") Date endDateTime, Pageable pageable);

}
