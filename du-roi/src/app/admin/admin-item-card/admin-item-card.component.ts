import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Api } from 'src/app/api/api';
import { Item } from 'src/app/item.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-item-card',
  templateUrl: './admin-item-card.component.html',
  styleUrls: ['./admin-item-card.component.css']
})
export class AdminItemCardComponent implements OnInit {
  //ADMIN ITEM CARD
  @Output() reloadItems = new EventEmitter();
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

  onClickDelete() : void
  {
    Swal.fire({
      title: 'Weet je het zeker?',
      text: "U staat op het punt een artikel te verwijderen",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Bevestigen',
      cancelButtonText: 'Annuleren'
    }).then((result) => {
      if (result.isConfirmed) {

        Item.deleteItem(this.product.id);
        Swal.fire(
          'Verwijderd!',
          'Het artikel is verwijderd.',
          'success'
        );
        // Herladen items na verwijderen
        setTimeout(() => 
        {
          this.reloadItems.emit();
        },
        500);
        
      }
    })
  }
}
