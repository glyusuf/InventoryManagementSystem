import { Component, OnInit } from '@angular/core';
import { ExpenseDataService } from '../service/data/expense-data.service';
import { Expense } from '../expense/expense.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense-page',
  templateUrl: './expense-page.component.html',
  styleUrls: ['./expense-page.component.css']
})
export class ExpensePageComponent implements OnInit {

  id: number;
  expense: Expense
  constructor(
    private expeseDateSevice: ExpenseDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.expense = new Expense(this.id, '', 0, new Date(), new Date(), '', new Date(), 'yusuf1');
   
    if (this.id != -1) {
      this.expeseDateSevice.retriveExpenseServiceById(this.id).subscribe(
        response => this.expense = response
      );
    }
  }

  saveExpense() {
    this.expense.updatedBy = sessionStorage.getItem('authenticatedUser');
    this.expense.modifiedDate = new Date();
    
    if (this.id != -1) {
      console.log("37 ID IS "+this.id );
      this.expeseDateSevice.editExpenseService(this.id, this.expense).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['expense'])
        }
      );
     
    } else {
      console.log("47 ID IS "+this.id );
      this.expense.createdBy = sessionStorage.getItem('authenticatedUser');
      this.expense.createdDate = new Date();
 
      console.log(this.expense.updatedBy);
      
      this.expeseDateSevice.createExpenseService(this.expense).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['expense'])
        }
      );
    }
  }
}
