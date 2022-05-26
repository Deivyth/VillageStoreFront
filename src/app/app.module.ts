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
import { CurrencyEURPipe } from './shared/currency-eur.pipe';
import { HttpRequestIntercept } from './config/interceptors/http-request.interceptor';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProductListComponent } from './entities/product/product-list/product-list.component';
import { ProductCardComponent } from './entities/product/product-card/product-card.component';
import { ProductDetailsComponent } from './entities/product/product-details/product-details.component';
import { LogInComponent } from './entities/user/log-in/log-in.component';
import { SignUpComponent } from './entities/user/sign-up/sign-up.component';
import { ProductFormComponent } from './entities/product/product-form/product-form.component';
import { OptionsComponent } from './entities/user/menu/options/options.component';
import { ChangeComponent } from './entities/user/menu/change-menu/change.component';
import { ChangeNameComponent } from './entities/user/menu/change-name/change-name.component';
import { ChangeEmailComponent } from './entities/user/menu/change-email/change-email.component';
import { ChangePasswordComponent } from './entities/user/menu/change-password/change-password.component';
import { CartListComponent } from './entities/cart/cart-list/cart-list.component';
import { CartCardComponent } from './entities/cart/cart-card/cart-card.component';
import { ProductsComponent } from './entities/user/products/products.component';

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
