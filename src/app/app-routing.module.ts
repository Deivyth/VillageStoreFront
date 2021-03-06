import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './entities/cart/cart-list/cart-list.component';
import { ProductDetailsComponent } from './entities/product/product-details/product-details.component';
import { ProductFormComponent } from './entities/product/product-form/product-form.component';
import { ProductListComponent } from './entities/product/product-list/product-list.component';
import { LogInComponent } from './entities/user/log-in/log-in.component';
import { ChangeEmailComponent } from './entities/user/menu/change-email/change-email.component';
import { ChangeComponent } from './entities/user/menu/change-menu/change.component';
import { ChangeNameComponent } from './entities/user/menu/change-name/change-name.component';
import { ChangePasswordComponent } from './entities/user/menu/change-password/change-password.component';
import { ProductsComponent } from './entities/user/products/products.component';
import { SignUpComponent } from './entities/user/sign-up/sign-up.component';
import { ProdGuardService } from './config/guards/prod-guard.service';
import { LoginGuard } from './config/guards/login.guard';
import { OrderListComponent } from './entities/order/order-list/order-list.component';
import { OrderPdfComponent } from './entities/order/order-pdf/order-pdf.component';


const routes: Routes = [

  { path : "", component: ProductListComponent},
  { path : "entrar", component: LogInComponent, canActivate: [LoginGuard] },
  { path : "registrar", component: SignUpComponent, canActivate: [LoginGuard] },
  { path : "productos/:idProduct", component: ProductDetailsComponent },
  { path : "producto/crear", component: ProductFormComponent, canActivate: [ProdGuardService], data: { espectedRol: ["admin","user"] } },
  { path : "producto/:idProduct/modificar", component: ProductFormComponent , canActivate: [ProdGuardService], data: { espectedRol: ["admin","user"] }},
  { path : "usuario/carrito", component: CartListComponent, canActivate: [ProdGuardService], data: { espectedRol: ["admin","user"] }},
  { path : "usuario/productos", component: ProductsComponent, canActivate: [ProdGuardService], data: { espectedRol: ["admin","user"] }},
  { path : "usuario/pedidos", component: OrderListComponent, canActivate: [ProdGuardService], data: { espectedRol: ["admin","user"] }},
  { path : "usuario/pedidos/:idOrder", component: OrderPdfComponent, canActivate: [ProdGuardService], data: { espectedRol: ["admin","user"] } },
  { path : "usuario/cambios", component: ChangeComponent, canActivate: [ProdGuardService], data: { espectedRol: ["admin","user"] } },
  { path : "usuario/cambios/nombre", component: ChangeNameComponent, canActivate: [ProdGuardService], data: { espectedRol: ["admin","user"] } },
  { path : "usuario/cambios/email", component: ChangeEmailComponent, canActivate: [ProdGuardService], data: { espectedRol: ["admin","user"] } },
  { path : "usuario/cambios/contrase??a", component: ChangePasswordComponent, canActivate: [ProdGuardService], data: { espectedRol: ["admin","user"] } },
  { path : "*", redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
