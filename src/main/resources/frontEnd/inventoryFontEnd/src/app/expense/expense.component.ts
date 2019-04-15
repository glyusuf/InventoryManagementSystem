import { Component, OnInit } from '@angular/core';

export class expeses{
  constructor(
    public id:number,
    public expenseDescription:string,
    public expenseAmount:number,
    public expenseDate:Date
  ){

  }
}
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  expenses = [
    new expeses(1,	'Expense 1',100, new Date()),
    new expeses(2,	'Expense 2',100, new Date()),
    new expeses(3,	'Expense 3',100, new Date())
  ]
  constructor() { }

  ngOnInit() {
  }

}
