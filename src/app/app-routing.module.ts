import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartListComponent } from './shopping-cart/cart-list/cart-list.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { ChangeEmailComponent } from './user/menu/change-email/change-email.component';
import { ChangeComponent } from './user/menu/change-menu/change.component';
import { ChangeNameComponent } from './user/menu/change-name/change-name.component';
import { ChangePasswordComponent } from './user/menu/change-password/change-password.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

const routes: Routes = [
  { path : "", component: ProductListComponent},
  { path : "productos/:idProduct", component: ProductDetailsComponent },
  { path : "producto/crear", component: ProductFormComponent },
  { path : "entrar", component: LogInComponent },
  { path : "registrar", component: SignUpComponent },
  { path : "usuario/carrito", component: CartListComponent},
  { path : "usuario/cambios", component: ChangeComponent },
  { path : "usuario/cambios/nombre", component: ChangeNameComponent},
  { path : "usuario/cambios/email", component: ChangeEmailComponent},
  { path : "usuario/cambios/contraseña", component: ChangePasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
