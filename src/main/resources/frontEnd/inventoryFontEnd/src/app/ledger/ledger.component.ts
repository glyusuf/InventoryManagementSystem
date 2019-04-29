import { Component, OnInit } from '@angular/core';
import { LedgerDataService } from '../service/data/ledger-data.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

export class Ledger {
  constructor(
    public id: number,
    public perticularDescription: string,
    public paymentType: string,
    public folio: string,
    public debit: number,
    public credit: number,
    public due: number,
    public createdDate: Date,
    public createdBy: string,
    public modifiedDate: Date,
    public updatedBy: string 
  ) { 
  }
}

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  
  message: string;
 
  private page: number = 0;
  private ledgerList: Array<any>;
  private pages: Array<number>;
  private strDate: Date;
  private endDate: Date;
  private strDate1: Date;
  private endDate1: Date;
  private totalAmount: number;

  constructor(
    private ledgerDataService: LedgerDataService,
    private router: Router
  ) {}
  

  ngOnInit() {
    this.getLedgerList();
  }

  getLedgerList() { 
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

    return this.ledgerDataService.getAllLedger(this.page, formattedStrDate, formattedEndDate).subscribe(
      data => {
        console.log(data);
        this.ledgerList = data['content'];
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
    this.getLedgerList();
  }

  deleteLedger(id) {
    this.ledgerDataService.deleteLedger(id).subscribe(
      response => {
        this.message = "Delete Successful";
        this.getLedgerList();
      }
    );
  }

  editLedger(id) {
    this.router.navigate(['ledger', id]);
  }

  
  addLedger(){
    this.router.navigate(['sell', -1]);
  }

  setMarginalDate() {
    this.getLedgerList();
  }
}
