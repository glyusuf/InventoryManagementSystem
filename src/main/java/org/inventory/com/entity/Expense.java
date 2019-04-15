package org.inventory.com.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "EXPENSE")
@EntityListeners(AuditingEntityListener.class)
public class Expense extends MandatoryDates{

	private static final long serialVersionUID = 1L;

	@SequenceGenerator(name = "EXPENSE_SEQUENCE_GENERATOR", sequenceName = "EXPENSE_ID_SEQUENCE")

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "EXPENSE_SEQUENCE_GENERATOR")
	private Long id;

	@Column(name = "EXPENSE_DESCRIPION", nullable = false)
	private String expenseDescription;

	@Column(name = "EXPENSE_AMOUNT", nullable = false)
	private BigDecimal expenseAmount;

	@Column(name = "EXPENSE_DATE", nullable = false)
	@CreatedDate
	private Date expenseDate;

	public Expense() {
		super();
	}

	public Expense(Long id, String expenseDescription, BigDecimal expenseAmount, Date expenseDate) {
		super();
		this.id = id;
		this.expenseDescription = expenseDescription;
		this.expenseAmount = expenseAmount;
		this.expenseDate = expenseDate;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Long getId() {
		return id;
	}

	public String getExpenseDescription() {
		return expenseDescription;
	}

	public BigDecimal getExpenseAmount() {
		return expenseAmount;
	}

	public Date getExpenseDate() {
		return expenseDate;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setExpenseDescription(String expenseDescription) {
		this.expenseDescription = expenseDescription;
	}

	public void setExpenseAmount(BigDecimal expenseAmount) {
		this.expenseAmount = expenseAmount;
	}

	public void setExpenseDate(Date expenseDate) {
		this.expenseDate = expenseDate;
	}

	@Override
	public String toString() {
		return "Expense [id=" + id + ", expenseDescription=" + expenseDescription + ", expenseAmount=" + expenseAmount
				+ ", expenseDate=" + expenseDate + "]";
	}

}
