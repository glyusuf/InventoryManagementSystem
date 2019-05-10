import { Component, OnInit } from '@angular/core';
import { StockService } from '../service/data/stock.service';
import { Router } from '@angular/router';
import { Category } from '../category/category.component';
import { CategoryService } from '../service/data/category.service';

export class Stock {
  constructor(
    public id: number,
    public productName: string,
    public productCategory: string,
    public quantity: number,
    public pricePerUnit: number,
    public createdDate: Date,
    public createdBy: string,
    public modifiedDate: Date,
    public updatedBy: string 
  ) { 
  }
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  private stockList: Array<any>;
  private pages: Array<number>;
  
  private page: number = 0;
  message:string;

  constructor(
    private stockService:StockService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllStock();
  }

  getAllStock() {
    return this.stockService.getAllStocks(this.page).subscribe(
      data => {
        console.log(data);
        this.stockList = data['content'];
        this.pages = new Array(data['totalPages']);
      },
      error => {
        console.log(error.error.message);
      }
    );
  } 
  
  addStock(){
    this.router.navigate(['stock', -1]);
  }

  editStock(id){
    this.router.navigate(['stock', id]);
  }

  deleteStock(id){
    this.stockService.deleteStock(id);
  }
 
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getAllStock();
  }

  setMarginalDate() {
    this.getAllStock();
  }

}
