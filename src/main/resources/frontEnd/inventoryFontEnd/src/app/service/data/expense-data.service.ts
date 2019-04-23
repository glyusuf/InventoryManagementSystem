import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Expense } from 'src/app/expense/expense.component';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExpenseDataService {

  baseUrl:string = 'http://localhost:8080/walton';
  constructor(
    private http: HttpClient
  ) { }

  retriveAllExpenses(){
    return this.http.get<Expense[]>(`http://localhost:8080/walton/expenses`);
  }
   
  retriveAllExpensesByDate(page:number, formattedStrDate:string, formattedEndDate:string){
    return this.http.get<Expense[]>(this.baseUrl+'/expensesbydate/get?page='+page+'&size=2&strDate='+formattedStrDate+'&endDate='+formattedEndDate)
  }

  deleteExpenseService(id){
    console.log(id);
    return this.http.get(`http://localhost:8080/walton/delete-expenses/${id}`);
  }

  retriveExpenseServiceById(id){
    return this.http.get<Expense>(`http://localhost:8080/walton/expenses/${id}`);
  }

  editExpenseService(id, expense){
    console.log("EDIT PAGE");
    return this.http.put(`http://localhost:8080/walton/edit-expenses/${id}`, expense);
  }

  createExpenseService(expense){ 
    console.log("Create PAGE");
    return this.http.post('http://localhost:8080/walton/save-expenses', expense);
  }

  calculateExpanceWithInDates(formattedStrDate:string, formattedEndDate:string){
    return this.http.get<number>(this.baseUrl+'/calculateexpensesbydate/get?strDate='+formattedStrDate+'&endDate='+formattedEndDate)
  }
}
