import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/data/category.service';
import { Router } from '@angular/router';

export class Category {
  constructor(
    public id: number,
    public categoryName: string,
    public createdDate: Date,
    public createdBy: string,
    public modifiedDate: Date,
    public updatedBy: string 
  ) { 
  }
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList: Category[];
  message: string;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllCategory();
  }
 
  getAllCategory(){
    this.categoryService.retriveAllCategory().subscribe(
      data => {
        this.categoryList = data;
        console.log(data);
      }, error=>{
        console.log(error.error.message);
      }
    );
  }

  deleteCategory(id) {
    this.categoryService.deleteCategory(id).subscribe(
      response => {
        this.message = "Delete Successful";
        this.getAllCategory();
      },error=> {
        console.log(error.error.message);
      }
    );
  }

  editCategory(id){
    this.router.navigate(['category', id]);
  }

  addCategory() {
    this.router.navigate(['category', -1]);
  }
}
