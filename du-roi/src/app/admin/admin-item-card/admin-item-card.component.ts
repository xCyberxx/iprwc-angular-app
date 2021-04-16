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
    this.product = this.productInput;
  }

  onClick() : void {

    

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
    }).then(async (result) => {
      if (result.isConfirmed) {

        let result = await Item.deleteItem(this.product.id);
        if (result)
        {
          // Verwijderen succesvol
          Swal.fire(
            'Verwijderd!',
            'Het artikel is verwijderd.',
            'success'
          );
        }
        else
        {
          // Verwijderen mislukt
          Swal.fire({
            title: 'Verwijderen mislukt',
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
        
        // Herladen items na verwijderen
        this.reloadItems.emit();
        
      }
    })
  }
}
