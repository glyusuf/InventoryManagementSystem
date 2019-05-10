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
    private stockService: StockService
  ) {

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      folio: ['', Validators.required],
      paymentType: ['', Validators.required],
      products: this.fb.array([
        this.addProductFromGroup()
      ])
    });

    this.getAllCategory();
  }

  addProductFromGroup(): FormGroup {
    return this.fb.group({
      category: [''],
      productName: [''],
      quantity: ['1'],
      pricePerUnit: [''],
      total: [''] 
    })
  }

  addProduct() {
    (<FormArray>this.myForm.get('products')).push(this.addProductFromGroup());
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

  selectCategory(event, i) {
    const categoryControl = (<FormArray>this.myForm.controls['products']).at(i).get('category') as FormArray;
    this.getProductfromStock(i, categoryControl.value);
  }

  getProductfromStock(i, catName): any {
    let stockdata: Stock[];
    let productnamesList: String[] = [];
    console.log("catName "+catName+" i"+i);
    return this.stockService.retriveStockByCatName(catName).subscribe(
      data => {
        stockdata = data;

        for (let stock of stockdata) {
          console.log("product Name " + stock.productName);
          productnamesList.push(stock.productName);
        }
        // console.log("PRODUCT NAME LIST " + productnamesList);

        let str = "productName" + i;
        let select = document.getElementById(str) as HTMLSelectElement;

        for (let stock of stockdata) {
           select.options[select.options.length] = new Option(stock.productName, stock.productName);
        }
        
        // (<FormArray>this.myForm.get('products')).controls[i].get('productList').patchValue({
        //   productList:productnamesList
        // });
        // (<FormArray>this.myForm.get('products')).controls[i].patchValue({ 
        //   productList:productnamesList
        // });
      }
    );
  }

  selectProduct(event, i) {
    const categoryControl = (<FormArray>this.myForm.controls['products']).at(i).get('category') as FormArray;
    const productNameControl = (<FormArray>this.myForm.controls['products']).at(i).get('productName') as FormArray;
    this.getdatafromStock(i, categoryControl.value, productNameControl.value);
  }

  getdatafromStock(i, cName, pName) {
    let stockdata: Stock;
    let qtyStr = "quantity" + i;
    let priceStr = "pricePerUnit" + i;
    let selectquantity = document.getElementById(qtyStr) as HTMLElement;
    let selectprice = document.getElementById(priceStr) as HTMLElement

    return this.stockService.retriveStockByCatNameAndProductName(cName, pName).subscribe(
      data => {
        stockdata = data; 
        (<FormArray>this.myForm.get('products')).controls[i].patchValue({ 
          quantity: data.quantity,
          pricePerUnit: data.pricePerUnit,
          total: data.quantity * data.pricePerUnit
          
        }); 
      }
    );
  }

  selectQuantity(event, i){ 
    (<FormArray>this.myForm.get('products')).controls[i].patchValue({ 
      total: (<FormArray>this.myForm.get('products')).controls[i].get('quantity').value * (<FormArray>this.myForm.get('products')).controls[i].get('pricePerUnit').value
     }); 
  }

  selectPrice(event, i){ 
    (<FormArray>this.myForm.get('products')).controls[i].patchValue({ 
      total: (<FormArray>this.myForm.get('products')).controls[i].get('quantity').value * (<FormArray>this.myForm.get('products')).controls[i].get('pricePerUnit').value
     }); 
  }

  onSubmit(): void {
    console.log("-->"+this.myForm.get('products').value );
    //console.log(this.myForm.get('products').controls.productName.value);
  }
}
