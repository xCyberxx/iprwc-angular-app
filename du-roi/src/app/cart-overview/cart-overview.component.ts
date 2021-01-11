import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cart } from '../cart.model';
import { User } from '../user.model';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.css']
})
export class CartOverviewComponent implements OnInit {
  cart : Cart;
  user : User;

  constructor(private router : Router) { }

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

  async onPay()
  {
    if(this.cart.items.length == 0)
    {
      Swal.fire({
        title: 'Voeg eerst artikelen toe',
        // html: 'Artikel toegevoegd aan winkelmandje!',
        icon: "info",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          
        },
      }).then((result) => {

      });
    }
    else
    {

      await Cart.payCart(this.user.id).then(response =>
      {
        console.log("paid");
      });
      Swal.fire({
        title: 'Betaling succesvol!',
        // html: 'Artikel toegevoegd aan winkelmandje!',
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          
        },
      }).then((result) => {

      });

      this.router.navigateByUrl('/');
    }
  }

}
