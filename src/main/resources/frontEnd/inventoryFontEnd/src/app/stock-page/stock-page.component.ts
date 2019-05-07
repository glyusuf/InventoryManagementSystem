import { Component, OnInit } from '@angular/core';
import { StockService } from '../service/data/stock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Stock } from '../stock/stock.component';
import { Category } from '../category/category.component';
import { CategoryService } from '../service/data/category.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css']
})
export class StockPageComponent implements OnInit {

  id: number;
  stock: Stock
  categoryList: Category[];
  selectedName: string;

  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.stock = new Stock(this.id, '', '', 0, 0, new Date(), '', new Date(), 'yusuf1');
     
    if (this.id != -1) {
      this.stockService.retriveStockById(this.id).subscribe(
        response => {
          this.stock = response;
          this.selectedName = response.productCategory;
          console.log(response);
        }
      );
    }
    this.selectedName = this.stock.productCategory;
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.retriveAllCategory().subscribe(
      data => {
        this.categoryList = data;
        console.log("ALL CATEGORY ===" + data);
      }, error => {
        console.log(error.error.message);
      }
    );
  }

  saveStock() {
    this.stock.updatedBy = sessionStorage.getItem('authenticatedUser');
    this.stock.modifiedDate = new Date(); 
    this.stock.productCategory =  this.selectedName;
    if (this.id != -1) {
      console.log();
      this.stockService.editStock(this.id, this.stock).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['stock'])
        }
      );

    } else {
      this.stock.createdBy = sessionStorage.getItem('authenticatedUser');
      this.stock.createdDate = new Date();
      console.log(this.stock.id);
      console.log(this.stock.productName);
      console.log(this.stock.productCategory +" ---- "+this.selectedName) ;
      console.log(this.stock.updatedBy);
      console.log(this.stock.modifiedDate);
      console.log(this.stock.createdBy);
      console.log(this.stock.createdDate);
      this.stockService.addStock(this.stock).subscribe(
         response => {
           console.log(response)
           this.router.navigate(['stock'])
         }
      );
    }
  } 
}
