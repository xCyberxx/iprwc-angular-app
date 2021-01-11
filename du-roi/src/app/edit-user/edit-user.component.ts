import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user : User;

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.user = User.getLoggedInUser();
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
    console.log("Done creating..");
  }

}
