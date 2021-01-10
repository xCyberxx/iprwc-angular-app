import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from 'src/app/api/api';
import { Item } from 'src/app/item.model';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  currentProduct : Item;

  constructor(private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    let selectedID = this.route.snapshot.params['id'];
    console.log(selectedID);

    const api = Api.getApi();
    api.get("/item/" + selectedID).then(response =>
      {
        let data = response.data.result;
        // console.log(data);
        this.currentProduct = new Item(data.id, data.name, data. description, data.image, data.price);
        console.log(this.currentProduct);
      });
      
  }

  onEditItem(form : NgForm)
  {
    const value = form.value;
    this.currentProduct.updateItem(value.productName, value.productDescription, value.productImage, value.productPrice);

    this.router.navigateByUrl("/admin");
  }

}
