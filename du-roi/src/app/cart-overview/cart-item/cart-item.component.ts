import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/cart.model';
import { Item } from 'src/app/item.model';

@Component({
  selector: '[cart-item-comp]',//'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Output() reloadItems = new EventEmitter();
  @Input() cart_id : string;
  product : Item;

  constructor() { }


  @Input() productInput : Item;

  ngOnInit(): void {
    this.product = this.productInput;
  }

  onClick(input)
  {
    console.log(this.product.name);
  }

  async onDelete()
  {
    console.log("deleting cart_id: " + this.cart_id);
    await Cart.deleteFromCart(this.cart_id);
    this.reloadItems.emit();
  }
}
