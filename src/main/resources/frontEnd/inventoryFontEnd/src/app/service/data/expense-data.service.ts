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
   
  retriveAllExpensesByDate(page:number){
    let date = new Date();
    let strDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let endDate = new Date(date.getFullYear(), date.getMonth()+1, 0);
    const  format = 'dd-MM-yyyy'; 
    const locale = 'en-US';
    const formattedStrDate = formatDate(strDate, format, locale);
    const formattedEndDate = formatDate(endDate, format, locale);

     
    console.log("DATE "+formattedStrDate );
    console.log("END DATE "+formattedEndDate);
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
}
