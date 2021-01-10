import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Api } from '../api/api';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSignup(form : NgForm)
  {
    const value = form.value;
    User.createUser(value.email, value.firstname, value.lastname, value.password);
    console.log("Done creating..");
  }

}
