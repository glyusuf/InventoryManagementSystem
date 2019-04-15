package org.inventory.com.repository;

import java.util.Date;
import java.util.List;

import org.inventory.com.entity.Expense;
import org.inventory.com.entity.Ledger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LedgerRepository extends PagingAndSortingRepository<Ledger, Integer>{

	Ledger findById(long id);


    @Query(value = "select * from ledger e where e.created_date between ?1 and ?2",nativeQuery = true) 
    List<Ledger> findAllWithinDates(@Param("created_date") Date strDateTime, @Param("created_date") Date endDateTime);
    
    @Query(value = "select * from ledger e where e.created_date between ?1 and ?2",nativeQuery = true) 
    Page<Ledger> findAllWithinDatesPagination(@Param("created_date") Date strDateTime, @Param("created_date") Date endDateTime, Pageable pageable);

}
