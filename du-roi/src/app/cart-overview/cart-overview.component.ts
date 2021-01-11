import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { User } from '../user.model';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.css']
})
export class CartOverviewComponent implements OnInit {
  cart : Cart;
  user : User;

  constructor() { }

  async ngOnInit(): Promise<void> {
    this.loadItems();
  }

  private async loadItems() {
    this.user = User.getLoggedInUser();
    // this.cart = null;
    // this.cart = 
    await Cart.getCartFromUser(this.user.id).then(response =>
      {
        this.cart = response;
      });
    console.log(this.cart);
  }

}
