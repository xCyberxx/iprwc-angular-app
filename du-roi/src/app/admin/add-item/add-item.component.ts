import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from 'src/app/api/api';
import { Item } from 'src/app/item.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    const api = Api.getApi();
  }

  async onAddItem(form : NgForm)
  {
    const value = form.value;
    await Item.createItem(value.productName, value.productDescription, value.productImage, value.productPrice);
    
    this.router.navigateByUrl("/admin");
  }

}
