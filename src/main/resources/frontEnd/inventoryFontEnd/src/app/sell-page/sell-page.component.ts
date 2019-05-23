import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CategoryService } from '../service/data/category.service';
import { Category } from '../category/category.component';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { StockService } from '../service/data/stock.service';
import { Stock } from '../stock/stock.component';
import { Ledger } from '../ledger/ledger.component';
import { LedgerDataService } from '../service/data/ledger-data.service';
import { Router } from '@angular/router';

export class StockData {
  constructor(
    public productName: string,
    public category: string,
    public quantity: number,
    public pricePerUnit: number,
    public total: number,
  ) {
  }
}

@Component({
  selector: 'app-sell-page',
  templateUrl: './sell-page.component.html',
  styleUrls: ['./sell-page.component.css']
})
export class SellPageComponent implements OnInit {
  myForm: FormGroup;
  categoryList: Category[];
  stock: Stock;
  ledger: Ledger
  stockList: StockData[];
  stockdataList: any = [];

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private stockService: StockService,
    private ledgerDataService: LedgerDataService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      customerName: ['', Validators.required],
      customerPhone: ['', Validators.required],
      customerAddress: ['', Validators.required],
      folio: ['', Validators.required],
      paymentType: ['', Validators.required],
      debit: ['', Validators.required],
      credit: ['', Validators.required],
      grandTotal: ['', Validators.required],
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
    console.log("catName " + catName + " i" + i);
    return this.stockService.retriveStockByCatName(catName).subscribe(
      data => {
        stockdata = data;
        for (let stock of stockdata) {
          console.log("product Name " + stock.productName);
          productnamesList.push(stock.productName);
        }

        let str = "productName" + i;
        let select = document.getElementById(str) as HTMLSelectElement;
        console.log("length " + select.options.length);

        for (i = select.options.length - 1; i >= 0; i--) {
          select.remove(i);
        }

        select.options[select.options.length] = new Option("Select Product", "0");
        for (let stock of stockdata) {
          select.options[select.options.length] = new Option(stock.productName, stock.productName);
        }
      }
    );
  }

  selectProduct(event, i) {
    const categoryControl = (<FormArray>this.myForm.controls['products']).at(i).get('category') as FormArray;
    const productNameControl = (<FormArray>this.myForm.controls['products']).at(i).get('productName') as FormArray;
    if (productNameControl.value != 0) {
      this.getdatafromStock(i, categoryControl.value, productNameControl.value);
    }
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

  selectQuantity(event, i) {
    (<FormArray>this.myForm.get('products')).controls[i].patchValue({
      total: (<FormArray>this.myForm.get('products')).controls[i].get('quantity').value * (<FormArray>this.myForm.get('products')).controls[i].get('pricePerUnit').value
    });
  }

  selectPrice(event, i) {
    (<FormArray>this.myForm.get('products')).controls[i].patchValue({
      total: (<FormArray>this.myForm.get('products')).controls[i].get('quantity').value * (<FormArray>this.myForm.get('products')).controls[i].get('pricePerUnit').value
    });
  }

  onSubmit(): void {
    this.logKeyValuePairs(this.myForm);
  }
  TotalChanged(event, i) {
    //console.log("Total Changed");
    //let pricePerUnitTemp = (<FormArray>this.myForm.controls['products']).at(i).get('pricePerUnit') as FormArray
    this.calculateTotal(this.myForm);
  }

  calculateTotal(group: FormGroup): void {
    let grandTotalCal = 0;
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormArray) {
        for (let i = 0; i < abstractControl.length; i++) {
          let total = (<FormArray>this.myForm.controls['products']).at(i).get('total') as FormArray;
          console.log("TOTAL IS " + i + "  " + total.value);
          grandTotalCal += total.value;
        }
      }
    });
    this.myForm.controls['grandTotal'].setValue(grandTotalCal);
  }

  logKeyValuePairs(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
      } else {
        console.log("key " + key + " value " + abstractControl.value);
      }
      if (abstractControl instanceof FormArray) {
        console.log("FROM ARRAY" + abstractControl.length);
        let Description = "";
        for (let i = 0; i < abstractControl.length; i++) {
          const { productName, category, quantity, pricePerUnit, total } = (<FormArray>this.myForm.controls['products']).at(i).value;

          new StockData(productName, category, quantity, pricePerUnit, total);
          this.stockdataList.push(new Stock(
            -1, productName, category, quantity, pricePerUnit, new Date(), "", new Date(), ""));

          //Create Description
          Description += "Category:" + category + ", Product Name: " + productName + ", Quantity:" + quantity + ", Price Per Unit:" + pricePerUnit + ", total:" + total + ";";
        }

        let due = this.myForm.controls['debit'].value - this.myForm.controls['credit'].value;

        this.ledger = new Ledger(-1, this.myForm.controls['customerName'].value,
          this.myForm.controls['customerPhone'].value,
          this.myForm.controls['customerAddress'].value,
          Description,
          this.myForm.controls['paymentType'].value,
          this.myForm.controls['folio'].value,
          this.myForm.controls['debit'].value,
          this.myForm.controls['credit'].value,
          due, new Date(), sessionStorage.getItem('authenticatedUser'), new Date(), sessionStorage.getItem('authenticatedUser'));

        this.ledgerDataService.addLedger(this.ledger).subscribe(
          response => {
            console.log(response)
            this.router.navigate(['ledger'])
          }
        );

        this.stockService.updateStockByCategoryAndProductName(this.stockdataList).subscribe(
          data => {

          })

      }
    })

    console.log(this.myForm.controls['customerName'].value);
    this.ledger.customerName = this.myForm.controls['customerName'].value;
  }
}
