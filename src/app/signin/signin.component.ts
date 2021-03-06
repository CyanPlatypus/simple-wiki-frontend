import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service'
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = new User();
  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignUp(){
    this.authService.signUp(this.user).subscribe(
      ()=>this.goToArticles(),
      ()=>this.showSignupError()
      );
  }

  onSignIn(){
    this.authService.signIn(this.user).subscribe(
      ()=>this.goToArticles(),
      ()=>this.showSignInError()
      );
  }

  goToArticles(){
    //this.router.navigate([`/articles`]);
    this.router.navigateByUrl('/articles');
  }

  showSignInError(){
    alert("Wrong login and/or password.")
  }

  showSignupError(){
    alert("User with this login already exists.")
  }

}
