import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart } from '../cart.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss']
})
export class CartCardComponent implements OnInit {

  @Input() item!: Cart;
  cartForm?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.updateForm(this.item);
  }

  private buildForm(): void {
    this.cartForm = this.formBuilder.group({
      quantity: [0, [Validators.required, Validators.min(0)]]
    })
  }

  private updateForm(cart: Cart): void{
    this.cartForm?.patchValue({
      productId: cart.getProductId(),
      supplierId: cart.getUserId(),
      quantity: cart.getQuantity()
    })
  }

  private createFromForm() {
    return {
      ...this.item,
      productId: this.item?.getProductId(),
      supplierId: this.item?.getUserId(),
      quantity: this.cartForm?.get(['quantity'])!.value
    }
  }

  changeCuantity(){
    const itemToSave: any = this.createFromForm();
    console.log(itemToSave);
    this.cartService.updateProductToCart(1,itemToSave).subscribe({
      next: ( cart ) => {},
      error: ( err ) => {}

    });
  }

  getFullPriceOfTheProduct(): number{
    const price = this.item.getProductPrice()!;
    const quantity = this.item.getQuantity()!;
    return  price * quantity;
  }

}
