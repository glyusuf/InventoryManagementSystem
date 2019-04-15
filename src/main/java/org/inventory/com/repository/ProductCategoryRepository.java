package org.inventory.com.repository;

import org.inventory.com.entity.ProductCategory;
import org.inventory.com.entity.Stock;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCategoryRepository extends PagingAndSortingRepository<ProductCategory, Integer>{

	ProductCategory findById(Long id);

}
