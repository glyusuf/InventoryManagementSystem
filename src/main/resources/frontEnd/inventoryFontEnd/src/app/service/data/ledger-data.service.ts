import { Injectable } from '@angular/core';
import { Ledger } from 'src/app/ledger/ledger.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LedgerDataService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl:string = 'http://localhost:8080/walton';

  getAllLedger(page:number,formattedStrDate: string, formattedEndDate:string){
    console.log("LEDGER SERVICE");
    return this.http.get<Ledger[]>(this.baseUrl+'/ledgerbydate/get?page='+page+'&size=2&strDate='+formattedStrDate+'&endDate='+formattedEndDate);
  }
   
  addLedger(stock){
    return this.http.post(this.baseUrl+'/save-ledger',stock);
  }

  editLedger(id, stock){ 
    console.log(" productCategory service EDIT "+stock.productCategory);
    return this.http.put(this.baseUrl+`/edit-ledger/${id}`, stock);
  }
 
  deleteLedger(id){
      return this.http.get(this.baseUrl+`/delete-ledger/${id}`);
  }

  retriveLedgerById(id){
    return this.http.get<Ledger>(this.baseUrl+`/ledger/${id}`);
  }
}
