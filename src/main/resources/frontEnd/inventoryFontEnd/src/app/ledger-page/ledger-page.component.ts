import { Component, OnInit } from '@angular/core';
import { Ledger } from '../ledger/ledger.component';
import { LedgerDataService } from '../service/data/ledger-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ledger-page',
  templateUrl: './ledger-page.component.html',
  styleUrls: ['./ledger-page.component.css']
})
export class LedgerPageComponent implements OnInit {

  id: number;
  ledger: Ledger;
  constructor(
    private ledgerDataService: LedgerDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ledger = new Ledger(this.id, '','','', 0,0,0, new Date(), '', new Date(), 'yusuf1');
   
    if (this.id != -1) {
      this.ledgerDataService.retriveLedgerById(this.id).subscribe(
        response => this.ledger = response
      );
    }
  }

  saveLedger() {
    this.ledger.updatedBy = sessionStorage.getItem('authenticatedUser');
    this.ledger.modifiedDate = new Date();
    
    if (this.id != -1) { 
      this.ledgerDataService.editLedger(this.id, this.ledger).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['ledger'])
        }
      );
     
    } else { 
      this.ledger.createdBy = sessionStorage.getItem('authenticatedUser');
      this.ledger.createdDate = new Date(); 
      
      this.ledgerDataService.addLedger(this.ledger).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['ledger'])
        }
      );
    }
  } 
}
