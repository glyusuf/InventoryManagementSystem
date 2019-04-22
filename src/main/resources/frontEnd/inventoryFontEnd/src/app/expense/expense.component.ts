import { Component, OnInit } from '@angular/core';
import { ExpenseDataService } from '../service/data/expense-data.service';
import { Router } from '@angular/router';

export class Expense{
  constructor(
    public id:number,
    public expenseDescription:string,
    public expenseAmount:number,
    public expenseDate:Date,
    public createdDate:Date,
    public createdBy: string,
    public modifiedDate:Date,
    public updatedBy: string
  ){

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

  constructor(
    private expenseDataService:ExpenseDataService,
    private router: Router
  ) { }

  ngOnInit() {
    //this.refreshExpensePage(); 
    this.getExpenseList();
  }

  refreshExpensePage(){
    this.expenseDataService.retriveAllExpenses().subscribe(
      response => { 
        this.expenses = response;
        console.log(response);
      } 
    );
  }

  deleteExpense(id){
    this.expenseDataService.deleteExpenseService(id).subscribe(
      response => { 
        this.message = "Delete Successful";
        this.refreshExpensePage(); 
      }
    );
  }
  
  editExpense(id){
    this.router.navigate(['expense', id]);
  }

  addExpense(){
    this.router.navigate(['expense', -1]);
  }

  ////////////////
  private page:number = 0;
  private expenseList:Array<any>;
  private pages:Array<number>;

  getExpenseList(){
    return this.expenseDataService.retriveAllExpensesByDate(this.page).subscribe(
      data=>{
          console.log(data);
          this.expenseList = data['content'];
          this.pages = new Array(data['totalPages']);
      },
      error => {
        console.log(error.error.message);
      }
    );
  }

  setPage(i, event:any){
    event.preventDefault();
    this.page=i;
    this.getExpenseList();
  }
}
