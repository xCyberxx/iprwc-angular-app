import { Component, OnInit } from '@angular/core';
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
    this.producten.push(new Item("idrandom", "Franse Empire Stoel", "Deze prachtige franse empire stoel is gemaakt in 1813", "chair2.jpg", 499.99));
    this.producten.push(new Item("idrandom", "Boulle Klok", "Een prachtige werkend boulle klok, handgemaakt, uit de periode 1910", "franseboulleclock.jpg", 1649.99));
    this.producten.push(new Item("idrandom", "Zuil met klok", "Dit is een grote zuil/staande console waar een boulle klok bij hoort.", "boullezuil.jfif", 3749.99));
    this.producten.push(new Item("idrandom", "Boulle klok van Oranje", "Deze boulle klok komt van de adellijke familie van Oranje-Nassau.", "boulleklokoranje.jpg", 9999.99));

    this.producten.push(new Item("idrandom", "Franse Empire Stoel", "Deze prachtige franse empire stoel is gemaakt in 1813", "chair2.jpg", 499.99));
    this.producten.push(new Item("idrandom", "Boulle Klok", "Een prachtige werkend boulle klok, handgemaakt, uit de periode 1910", "franseboulleclock.jpg", 1649.99));
    this.producten.push(new Item("idrandom", "Zuil met klok", "Dit is een grote zuil/staande console waar een boulle klok bij hoort.", "boullezuil.jfif", 3749.99));
    this.producten.push(new Item("idrandom", "Boulle klok van Oranje", "Deze boulle klok komt van de adellijke familie van Oranje-Nassau.", "boulleklokoranje.jpg", 9999.99));
    this.producten.push(new Item("idrandom", "Franse Empire Stoel", "Deze prachtige franse empire stoel is gemaakt in 1813", "chair2.jpg", 499.99));
    this.producten.push(new Item("idrandom", "Boulle Klok", "Een prachtige werkend boulle klok, handgemaakt, uit de periode 1910", "franseboulleclock.jpg", 1649.99));


  }

}
