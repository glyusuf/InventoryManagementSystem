import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CategoryService } from '../service/data/category.service';
import { Category } from '../category/category.component';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { StockService } from '../service/data/stock.service';
import { Stock } from '../stock/stock.component';

@Component({
  selector: 'app-sell-page',
  templateUrl: './sell-page.component.html',
  styleUrls: ['./sell-page.component.css']
})
export class SellPageComponent implements OnInit {
  myForm: FormGroup;
  categoryList: Category[];
   
  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private stockService:StockService
  ) {

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      folio: ['', Validators.required],
      paymentType: ['',Validators.required],
      products: this.fb.array([
        this.addProductFromGroup()
      ])
    });

    this.getAllCategory();
  }

  addProductFromGroup(): FormGroup{
    return this.fb.group({
      category: [''],
      productName: [''],
      quantity: [''],
      pricePerUnit: [''],
      total: [''], 
    })
  }
  addProduct(){
    (<FormArray>this.myForm.get('products')).push(this.addProductFromGroup());
  }

  onSubmit(): void {
    console.log(this.myForm.controls.folio.value);
    //console.log(this.myForm.get('products').controls.productName.value);
  }

  getAllCategory() {
    console.log("INSIDE CATEGORY");
    this.categoryService.retriveAllCategory().subscribe(
      data => {
        this.categoryList = data;
        console.log("ALL CATEGORY ===" + data);
      }, error => {
        console.log(error.error.message);
      }
    );
  }

  selectCategory(event, i) {  
    const categoryControl = (<FormArray>this.myForm.controls['products']).at(0).get('category') as FormArray;
    this.getProductfromStock(i,categoryControl.value); 
  }

  getProductfromStock(i, catName):any  { 
    let stockdata: Stock[]; 
    let productnamesList: String[]= [];
     
    return this.stockService.retriveStockByCatName(catName).subscribe(
      data => {
        stockdata = data; 

        for(let stock of stockdata){
          console.log("product Name "+stock.productName);
          productnamesList.push(stock.productName);
        }
        console.log("PRODUCT NAME LIST "+productnamesList);
         
        let str = "productName"+i; 
        let select = document.getElementById(str) as HTMLElement
         
        for(let stock  of stockdata) {
            select.options[select.options.length] = new Option(stock.productName, stock.productName);
        }
      }
    );
  }

  selectProduct(event, i) {  
    const categoryControl = (<FormArray>this.myForm.controls['products']).at(0).get('category') as FormArray;
    const productNameControl = (<FormArray>this.myForm.controls['products']).at(0).get('productName') as FormArray;
    
    this.getdatafromStock(i,categoryControl.value, productNameControl.value);  
  }

  getdatafromStock(i,cName, pName){
    let stockdata : Stock;
    let qtyStr = "quantity"+i;
    let priceStr = "pricePerUnit"+i;
    let selectquantity = document.getElementById(qtyStr) as HTMLElement;
    let selectprice = document.getElementById(priceStr) as HTMLElement
         
    return this.stockService.retriveStockByCatNameAndProductName(cName,pName).subscribe(
      data => {
        stockdata = data; 
        console.log("data.quantity "+data.quantity);
        //selectquantity.innerHTML = data.quantity.toString;
        const categoryControl = (<FormArray>this.myForm.controls['products']).at(0).get('quantity') as FormArray;
        
        selectquantity.value = data.quantity+"";
        console.log("data.quantity "+selectquantity.value);
      }
    );
  }
}
