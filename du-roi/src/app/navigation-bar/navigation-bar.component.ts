import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../user.model';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  user : User;

  constructor(private router : Router) { 
    router.events.subscribe((val) => {
      // see also 
      this.reloadUser();
      console.log(val instanceof NavigationEnd) 
  });

  }

  ngOnInit(): void {
    this.reloadUser();
  }

  private reloadUser() {
    this.user = User.getLoggedInUser();
  }

  onLogout()
  {
    User.Logout();
    this.router.navigateByUrl("/");
    this.reloadUser();
    Swal.fire({
      title: 'Uitgelogd',
      // html: 'Artikel toegevoegd aan winkelmandje!',
      icon: "info",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        
      },
    }).then((result) => {

    })
  }

}
