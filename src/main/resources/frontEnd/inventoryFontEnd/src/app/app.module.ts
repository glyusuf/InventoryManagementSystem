import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { LedgerComponent } from './ledger/ledger.component';
import { StockComponent } from './stock/stock.component';
import { ExpenseComponent } from './expense/expense.component';
import { CategoryComponent } from './category/category.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpensePageComponent } from './expense-page/expense-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { StockPageComponent } from './stock-page/stock-page.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { LedgerPageComponent } from './ledger-page/ledger-page.component';
import { SellPageComponent } from './sell-page/sell-page.component';
   
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    LogoutComponent,
    LedgerComponent,
    StockComponent,
    ExpenseComponent,
    CategoryComponent,
    MenuComponent,
    FooterComponent,
    ErrorComponent,
    ExpensePageComponent,
    CategoryPageComponent,
    StockPageComponent,
    LedgerPageComponent,
    SellPageComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
