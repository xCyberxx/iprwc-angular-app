import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/item.model';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  product : Item;

  constructor() { }

  ngOnInit(): void {
    console.log("created item");
    this.product = new Item("chair2.jpg", "Franse Empire Stoel", "Deze prachtige franse empire stoel is gemaakt in 1813", 149.99);
  }

}
