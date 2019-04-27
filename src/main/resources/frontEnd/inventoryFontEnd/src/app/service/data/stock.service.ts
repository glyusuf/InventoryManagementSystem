import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from 'src/app/stock/stock.component';
import {BrowserModule} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl:string = 'http://localhost:8080/walton';

  getAllStocks(page:number){
    return this.http.get<Stock[]>(this.baseUrl+'/allstocks?page='+page+'&size=2');
  }
   
  addStock(stock){
    console.log(" productCategory service 111 "+stock.productCategory);
    return this.http.post(this.baseUrl+'/save-stocks',stock);
  }

  editStock(id, stock){ 
    console.log(" productCategory service EDIT "+stock.productCategory);
    return this.http.put(this.baseUrl+`/edit-stock/${id}`, stock);
  }
 
  deleteStock(id){
      return this.http.get(this.baseUrl+`/delete-stocks/${id}`);
  }

  retriveStockById(id){
    return this.http.get<Stock>(this.baseUrl+`/stocks/${id}`);
  }
}
