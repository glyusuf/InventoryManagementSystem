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
import { RouteGuardService } from './service/route-guard.service';
import { ExpensePageComponent } from './expense-page/expense-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';

const routes: Routes = [
  { path:'', component:LoginComponent },
  { path:'login', component:LoginComponent },
  { path:'logout', component:LogoutComponent },
  { path:'welcome/:name', component:WelcomeComponent, canActivate:[RouteGuardService]},
  { path:'menu', component:MenuComponent, canActivate:[RouteGuardService] },
  { path:'footer', component:FooterComponent , canActivate:[RouteGuardService]},
  { path:'ledger', component:LedgerComponent, canActivate:[RouteGuardService] },
  { path:'expense', component:ExpenseComponent, canActivate:[RouteGuardService] },
  { path:'category', component:CategoryComponent , canActivate:[RouteGuardService]},
  { path:'stock', component:StockComponent , canActivate:[RouteGuardService]},
  { path:'expense/:id', component:ExpensePageComponent , canActivate:[RouteGuardService]},
  { path:'category/:id', component:CategoryPageComponent , canActivate:[RouteGuardService]},
  { path:'**', component:ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
