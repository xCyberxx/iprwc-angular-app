import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Api } from '../api/api';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  async onSignup(form : NgForm)
  {
    const value = form.value;
    let result : number;
    await User.createUser(value.email, value.firstname, value.lastname, value.password).then(response => {
      result = response;
    });

    if (result == 0)
    {
      //niet geregistreerd.
      Swal.fire({
        title: 'Informatie ongeldig.',
        // html: 'Artikel toegevoegd aan winkelmandje!',
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          
        },
      }).then((result) => {
  
      });
      return;
    }

    Swal.fire({
      title: 'Geregisteerd',
      // html: 'Artikel toegevoegd aan winkelmandje!',
      icon: "success",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        
      },
    }).then((result) => {

    });
    this.router.navigateByUrl("/login");
  }

}
