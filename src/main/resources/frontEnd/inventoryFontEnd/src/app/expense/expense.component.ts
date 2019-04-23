import { Component, OnInit } from '@angular/core';
import { ExpenseDataService } from '../service/data/expense-data.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

export class Expense {
  constructor(
    public id: number,
    public expenseDescription: string,
    public expenseAmount: number,
    public expenseDate: Date,
    public createdDate: Date,
    public createdBy: string,
    public modifiedDate: Date,
    public updatedBy: string
  ) {

  }
}
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  expenses: Expense[];
  message: string;
 
  private page: number = 0;
  private expenseList: Array<any>;
  private pages: Array<number>;
  private strDate: Date;
  private endDate: Date;
  private strDate1: Date;
  private endDate1: Date;
  private totalAmount: number;

  constructor(
    private expenseDataService: ExpenseDataService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.refreshExpensePage(); 
    this.getExpenseList();
  }

  refreshExpensePage() {
    this.expenseDataService.retriveAllExpenses().subscribe(
      response => {
        this.expenses = response;
        console.log(response);
      }
    );
  }

  deleteExpense(id) {
    this.expenseDataService.deleteExpenseService(id).subscribe(
      response => {
        this.message = "Delete Successful";
        this.refreshExpensePage();
      }
    );
  }

  editExpense(id) {
    this.router.navigate(['expense', id]);
  }

  addExpense() {
    this.router.navigate(['expense', -1]);
  }

  getExpenseList() {
    let date = new Date();
    this.strDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    let formattedStrDate = formatDate(this.strDate, format, locale);
    let formattedEndDate = formatDate(this.endDate, format, locale);

    if (this.strDate1 && this.endDate1) {
      formattedStrDate = formatDate(this.strDate1, format, locale);
      formattedEndDate = formatDate(this.endDate1, format, locale);
    }

    return this.expenseDataService.retriveAllExpensesByDate(this.page, formattedStrDate, formattedEndDate).subscribe(
      data => {
        console.log(data);
        this.expenseList = data['content'];
        this.pages = new Array(data['totalPages']);
      },
      error => {
        console.log(error.error.message);
      }
    );
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getExpenseList();
  }

  setMarginalDate() {
    this.getExpenseList();
  }

  getCalculation() {
    let date = new Date();
    this.strDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    let formattedStrDate = formatDate(this.strDate, format, locale);
    let formattedEndDate = formatDate(this.endDate, format, locale);

    if (this.strDate1 && this.endDate1) {
      formattedStrDate = formatDate(this.strDate1, format, locale);
      formattedEndDate = formatDate(this.endDate1, format, locale);
    }

    this.expenseDataService.calculateExpanceWithInDates(formattedStrDate, formattedEndDate).subscribe( 
      response => {
        console.log(response);
        this.totalAmount = response;
      },error =>  {
        console.log(error.error.message);
      }
    );
  }
}
