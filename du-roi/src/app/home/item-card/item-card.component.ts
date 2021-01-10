import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/item.model';
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
    // console.log("created item");
    //this.product = new Item("idrandom", "Franse Empire Stoel", "Deze prachtige franse empire stoel is gemaakt in 1813", "chair2.jpg", 149.99);
    // console.log(this.productInput);
    this.product = this.productInput;
  }

  onClick() : void {

    console.log('Toevoegen item ' + this.product.name + " aan winkelwagen");

  }

  onClickAdd() : void
  {
    let timerInterval;
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

    })
  }

}
