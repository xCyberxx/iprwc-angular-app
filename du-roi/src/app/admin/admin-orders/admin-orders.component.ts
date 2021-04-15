import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/api/api';
import { Cart } from 'src/app/cart.model';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders = [];

  constructor() { }

  ngOnInit(): void {

    this.loadOrders();

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
    api.get("/order/all").then((response) => {
      // console.log(response.data.result);

      let grouped = this.groupByKey(response.data.result, 'id');

      this.orders = Object.keys(grouped).map(function(orderNamedIndex){
        let order = grouped[orderNamedIndex];
        return order;
    });

    this.orders.reverse();
    });

  }
}
