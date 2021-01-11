import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  async onLogin(form : NgForm)
  {
    const value = form.value;
    let result = await User.Login(value.email, value.password);
    console.log(result);
    console.log(User.getLoggedInUser().userGroup);
    if(result) // is 1
    {
      switch(User.getLoggedInUser().userGroup)
      {
        case 'admin':
          this.router.navigateByUrl("/admin");
          break;
        case 'customer':
          this.router.navigateByUrl("/");
          break;
        default:
          this.router.navigateByUrl("/");
          break;

      }
    }
    Swal.fire({
      title: 'Welkom ' + User.getLoggedInUser().firstName,
      // html: 'Artikel toegevoegd aan winkelmandje!',
      icon: "success",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        
      },
    }).then((result) => {

    });
    console.log("Attempted to login.");
  }
}
