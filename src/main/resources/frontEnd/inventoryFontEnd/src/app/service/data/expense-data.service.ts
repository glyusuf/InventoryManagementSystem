import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Expense } from 'src/app/expense/expense.component';

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

    console.log("DATE "+strDate );
    console.log("END DATE "+endDate);
    return this.http.get<Expense[]>(this.baseUrl+'/expensesbydate/get?page='+page+'&size=10&strDate=01-04-2019&endDate=30-04-2019')
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
