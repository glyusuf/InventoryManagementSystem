import { Component, OnInit, ElementRef } from '@angular/core';
import { CategoryService } from '../service/data/category.service';
import { Category } from '../category/category.component';
export class SellRow {
  constructor(
    public id: number,
    public perticularDescription: string
  ){}
}
@Component({
  selector: 'app-sell-page',
  templateUrl: './sell-page.component.html',
  styleUrls: ['./sell-page.component.css']
})

export class SellPageComponent implements OnInit {

  categoryList: Category[]; 
  
  constructor(
    private categoryService: CategoryService,
    private elRef:ElementRef
  ) { }
 
  ngOnInit() {
    this.getAllCategory();
  }
 
  items = [
    {id:1}
  ];

  addNewItems(){
    console.log("I is "+this.items.length+1);
    let i:number =this.items.length+1;
    console.log("I is "+i);
    this.items.push({'id':i});
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

  setFormElements(){
    console.log(document.getElementById('productName1'));
    console.log("==>>"+this.elRef.nativeElement.querySelector('productName1'));
    for (let i = 0; i < this.items.length; i++) {
      let categoryProduct = document.getElementById('categoryProduct'+i) as HTMLElement; 
      console.log(categoryProduct);
    }
  } 

  selectCountry(event) {

    let fireboxFix = event.target || event.srcElement;
    let indexToFind = (<HTMLSelectElement>fireboxFix).value;
    console.log("indexToFind "+indexToFind);
  }

  selectCategory(event){
    let category = event.target || event.srcElement;
    let categoryValue = (<HTMLSelectElement>category).value;
    console.log("indexToFind "+categoryValue);
  }
}
