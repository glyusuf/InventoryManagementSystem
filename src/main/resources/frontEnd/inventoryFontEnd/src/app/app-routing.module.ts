import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './logout/logout.component';
import { LedgerComponent } from './ledger/ledger.component';
import { ExpenseComponent } from './expense/expense.component';
import { CategoryComponent } from './category/category.component';
import { StockComponent } from './stock/stock.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path:'', component:LoginComponent },
  { path:'login', component:LoginComponent },
  { path:'logout', component:LogoutComponent },
  { path:'welcome/:name', component:WelcomeComponent },
  { path:'menu', component:MenuComponent },
  { path:'footer', component:FooterComponent },
  { path:'ledger', component:LedgerComponent },
  { path:'expense', component:ExpenseComponent },
  { path:'category', component:CategoryComponent },
  { path:'stock', component:StockComponent },
  { path:'**', component:ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
