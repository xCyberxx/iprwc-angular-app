import { Component, OnInit } from '@angular/core';
import { Api } from '../api/api';
import { Item } from '../item.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  producten : Item[] = [];

  constructor() { }

  ngOnInit(): void {
    //Ophalen items via de rest api
    this.loadItems();
  }


  private loadItems() {
    this.producten = [];
    const api = Api.getApi();
    api.get("/item/all").then((response) => {
      // console.log(response.data.result);
      response.data.result.forEach(element => {
        console.log(element);
        this.producten.push(new Item(element.id, element.name, element.description, element.image, element.price));

      });
    });
  }
}
