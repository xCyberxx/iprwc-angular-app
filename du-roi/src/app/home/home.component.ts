import { Component, OnInit } from '@angular/core';
import { Api } from '../api/api';
import { Item } from '../item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  producten : Item[] = [];

  constructor() { }

  ngOnInit(): void {

    //Ophalen items via de rest api
    const api = Api.getApi();
    api.get("/item/all").then((response) => {
      console.log(response.data.result);
      response.data.result.forEach(element => { // loop alle elementen binnen de item tabel
        console.log(element);
        this.producten.push(new Item(element.id, element.name, element.description, element.image, element.price));

      });
    });
  }

}
