package org.inventory.com.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "PRODUCT_CATEGORY")
@EntityListeners(AuditingEntityListener.class)
public class ProductCategory extends MandatoryDates {
	private static final long serialVersionUID = 1L;

    @SequenceGenerator(name = "PCATEGORY_SEQUENCE_GENERATOR", sequenceName = "PCATEGORY_ID_SEQUENCE")

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "PCATEGORY_SEQUENCE_GENERATOR")
    private Long id;
    
	@Column(name = "CATEGORY_NAME", nullable = false) 
	private String categoryName;

	
	public ProductCategory() {
		super();
	}

	public ProductCategory(Long id, String categoryName) {
		super();
		this.id = id;
		this.categoryName = categoryName;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Long getId() {
		return id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	
}
