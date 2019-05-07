import { Component, OnInit } from '@angular/core';
import { Category } from '../category/category.component';
import { CategoryService } from '../service/data/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  id: number; 
  category:Category
  
  constructor(
    private categoryDataService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.category = new Category(this.id,'', new Date(), '', new Date(), '');
   
    if (this.id != -1) {
      this.categoryDataService.retriveCategoryById(this.id).subscribe(
        response => this.category = response
      );
    }
  }

  saveCategory(){
    this.category.updatedBy = sessionStorage.getItem('authenticatedUser');
    this.category.modifiedDate = new Date();
    
    if (this.id != -1) { 
      this.categoryDataService.editCategory(this.id, this.category).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['category'])
        }
      );
     
    } else {
      console.log("47 ID IS "+this.id );
      this.category.createdBy = sessionStorage.getItem('authenticatedUser');
      this.category.createdDate = new Date();
 
      console.log(this.category.updatedBy);
      
      this.categoryDataService.createCategoryService(this.category).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['category'])
        }
      );
    }
  }
}
