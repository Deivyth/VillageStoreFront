import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { CurrencyEURPipe } from './shared/currency-eur.pipe';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { HttpRequestIntercept } from './config/interceptors/http-request.interceptor';
import { LogInComponent } from './user/log-in/log-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { OptionsComponent } from './user/menu/options/options.component';
import { ChangeNameComponent } from './user/menu/change-name/change-name.component';
import { ChangeComponent } from './user/menu/change-menu/change.component';
import { ChangeEmailComponent } from './user/menu/change-email/change-email.component';
import { ChangePasswordComponent } from './user/menu/change-password/change-password.component';
import { CartListComponent } from './shopping-cart/cart-list/cart-list.component';
import { CartCardComponent } from './shopping-cart/cart-card/cart-card.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProductsComponent } from './user/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ProductListComponent,
    ProductCardComponent,
    CurrencyEURPipe,
    ProductDetailsComponent,
    LogInComponent,
    SignUpComponent,
    ProductFormComponent,
    OptionsComponent,
    ChangeComponent,
    ChangeNameComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    CartListComponent,
    CartCardComponent,
    ProductsComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    ToastModule,
    MessageModule,
    MessagesModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestIntercept,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
