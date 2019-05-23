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
@Table(name = "LEDGER")
@EntityListeners(AuditingEntityListener.class)
public class Ledger extends MandatoryDates{

	private static final long serialVersionUID = 1L;

    @SequenceGenerator(name = "LEDGER_SEQUENCE_GENERATOR", sequenceName = "LEGDER_ID_SEQUENCE")

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "LEDGER_SEQUENCE_GENERATOR")
    private Long id;
    

    @Column(name = "CUSTOMER_NAME", nullable = false)
	private String customerName;
    

    @Column(name = "CUSTOMER_PHONE", nullable = false)
	private String customerPhone;

    @Column(name = "customer_Address", nullable = false)
	private String customerAddress;
    
    @Column(name = "PERTICULAR_DESCRIPTION", nullable = false)
	private String perticularDescription;

    @Column(name = "PAYMENT_TYPE", nullable = false)
   	private String paymentType;
    
    @Column(name = "FOLIO", nullable = false)
	private String folio;

	@Column(name = "DEBIT", nullable = false)
	private BigDecimal debit;
    
	@Column(name = "CREDIT", nullable = false)
	private BigDecimal credit;
    
	@Column(name = "DUE", nullable = false)
	private BigDecimal due;

	
	public Ledger() {
		super();
	}
	
	public Ledger(Long id, String customerName, String customerPhone, String customerAddress,
			String perticularDescription, String paymentType, String folio, BigDecimal debit, BigDecimal credit,
			BigDecimal due) {
		super();
		this.id = id;
		this.customerName = customerName;
		this.customerPhone = customerPhone;
		this.customerAddress = customerAddress;
		this.perticularDescription = perticularDescription;
		this.paymentType = paymentType;
		this.folio = folio;
		this.debit = debit;
		this.credit = credit;
		this.due = due;
	}
 
	public Long getId() {
		return id;
	}

	public String getPerticularDescription() {
		return perticularDescription;
	}

	public String getFolio() {
		return folio;
	}

	public BigDecimal getDebit() {
		return debit;
	}

	public BigDecimal getCredit() {
		return credit;
	}

	public BigDecimal getDue() {
		return due;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setPerticularDescription(String perticularDescription) {
		this.perticularDescription = perticularDescription;
	}

	public void setFolio(String folio) {
		this.folio = folio;
	}

	public void setDebit(BigDecimal debit) {
		this.debit = debit;
	}

	public void setCredit(BigDecimal credit) {
		this.credit = credit;
	}

	public void setDue(BigDecimal due) {
		this.due = due;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerPhone() {
		return customerPhone;
	}

	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}

	public String getCustomerAddress() {
		return customerAddress;
	}

	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}

	@Override
	public String toString() {
		return "Ledger [id=" + id + ", customerName=" + customerName + ", customerPhone=" + customerPhone
				+ ", customerAddress=" + customerAddress + ", perticularDescription=" + perticularDescription
				+ ", paymentType=" + paymentType + ", folio=" + folio + ", debit=" + debit + ", credit=" + credit
				+ ", due=" + due + "]";
	} 
	
}
