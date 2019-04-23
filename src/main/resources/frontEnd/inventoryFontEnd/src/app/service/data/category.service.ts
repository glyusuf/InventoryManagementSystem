import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/category/category.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl:string = 'http://localhost:8080/walton';

  constructor(
    private http: HttpClient
  ) { }

  retriveAllCategory(){
    return this.http.get<Category[]>(this.baseUrl+'/category');
  }

  retriveCategoryById(id){
    return this.http.get<Category>(this.baseUrl+`/category/${id}`);
  }

  deleteCategory(id){
    return this.http.get(this.baseUrl+`/delete-category/${id}`);
  }

  editCategory(id, category){
    return this.http.put(this.baseUrl+`/edit-category/${id}`, category);
  }

  createCategoryService(category){
    console.log("Create Category");
    return this.http.post(this.baseUrl+'/save-category', category);
  }
}
