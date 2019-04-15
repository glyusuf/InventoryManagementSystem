package org.inventory.com.entity;

import java.math.BigDecimal;

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
@Table(name = "STOCK")
@EntityListeners(AuditingEntityListener.class)
public class Stock extends MandatoryDates {

	private static final long serialVersionUID = 1L;

	@SequenceGenerator(name = "STOCK_SEQUENCE_GENERATOR", sequenceName = "STOCK_ID_SEQUENCE")

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "STOCK_SEQUENCE_GENERATOR")
	private Long id;

	@Column(name = "PRODUCT_NAME", nullable = false)
	private String productName;

	@Column(name = "PRODUCT_CATEGORY", nullable = false)
	private String productCategory;

	@Column(name = "QUANTITY", nullable = false)
	private Long quantity;

	@Column(name = "PRICE_PER_UNIT", nullable = false)
	private BigDecimal pricePerUnit;

	public Stock() {
		super();
	}

	public Stock(Long id, String productName, String productCategory, Long quantity, BigDecimal pricePerUnit) {
		super();
		this.id = id;
		this.productName = productName;
		this.productCategory = productCategory;
		this.quantity = quantity;
		this.pricePerUnit = pricePerUnit;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Long getId() {
		return id;
	}

	public String getProductName() {
		return productName;
	}

	public Long getQuantity() {
		return quantity;
	}

	public BigDecimal getPricePerUnit() {
		return pricePerUnit;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public void setPricePerUnit(BigDecimal pricePerUnit) {
		this.pricePerUnit = pricePerUnit;
	}

	public String getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(String productCategory) {
		this.productCategory = productCategory;
	}

	@Override
	public String toString() {
		return "Stock [id=" + id + ", productName=" + productName + ", productCategory=" + productCategory
				+ ", quantity=" + quantity + ", pricePerUnit=" + pricePerUnit + "]";
	}

}
