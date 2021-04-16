import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/cart.model';
import { Item } from 'src/app/item.model';
import { User } from 'src/app/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  product : Item;

  constructor() { }

  @Input() productInput : Item;

  ngOnInit(): void {
    this.product = this.productInput;
  }

  onClick() : void {


  }

  async onClickAdd()
  {
    const user = User.getLoggedInUser();

    if(user)
    {
      if(user.userGroup != "customer") // geen klant
      {
        Swal.fire({
          title: 'U bent geen klant',
          // html: 'Artikel toegevoegd aan winkelmandje!',
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            
          },
        }).then((result) => {
  
        })
        return;
      }

      //ingelogd
      let result = await Cart.addToCart(user.id, this.product.id);

      let timerInterval;
      if (result) 
      {
        Swal.fire({
          title: 'Toegevoegd aan winkelmandje',
          // html: 'Artikel toegevoegd aan winkelmandje!',
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            
          },
        }).then((result) => {
  
        });
      }
      else
      {
        Swal.fire({
          title: 'Toevoegen mislukt',
          // html: 'Artikel toegevoegd aan winkelmandje!',
          icon: "error",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            
          },
        }).then((result) => {
  
        });
      }



    }
    else
    {
      //niet ingelogd
      Swal.fire({
        title: 'Inloggen vereist',
        // html: 'Artikel toegevoegd aan winkelmandje!',
        icon: "error",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          
        },
      }).then((result) => {

      });
    }

    
  }

}
