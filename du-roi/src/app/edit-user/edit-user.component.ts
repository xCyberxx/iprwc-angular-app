import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Api } from '../api/api';
import { User } from '../user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user : User;
  orders = [];

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.user = User.getLoggedInUser();

    this.loadOrders()
  }

  async onUpdate(form : NgForm)
  {
    const value = form.value;
    //User.createUser(value.email, value.firstname, value.lastname, value.password);
    await User.updateUser(this.user.id, this.user.email, value.firstname, value.lastname, value.password);
    Swal.fire({
      title: 'Informatie gewijzigd',
      // html: 'Artikel toegevoegd aan winkelmandje!',
      icon: "success",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        
      },
    }).then((result) => {

    });
    this.router.navigateByUrl("/");
  }

  private groupByKey(array, key) {
    return array
      .reduce((hash, obj) => {
        if(obj[key] === undefined) return hash; 
        return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
      }, {})
 }

  private loadOrders() {
    const api = Api.getApi();
    api.get("/order/user/" + this.user.id).then((response) => {


      let grouped = this.groupByKey(response.data.result, 'id');

      this.orders = Object.keys(grouped).map(function(orderNamedIndex){
        let order = grouped[orderNamedIndex];
        return order;
    });

    this.orders.reverse();
    });

  }

}
