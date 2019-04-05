import { Injectable } from '@angular/core';
import { Observable, throwError  } from 'rxjs';
import { tap,  catchError } from 'rxjs/operators';

import {SIGNINENDPOINT, SIGNUPENDPOINT} from './wikiendpoints'
import {User} from './user'

import{HttpClient, HttpHeaders} from'@angular/common/http';
import { tick } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user:User;
  private basic:string;

  private signinUrl = SIGNINENDPOINT;
  private signupUrl = SIGNUPENDPOINT;

  constructor(private http:HttpClient) { 
    this.user = null;
    this.basic = null;
  }

  isSignedin():boolean{
    return ! (this.user == null || this.basic == null);
  }

  getAuth():string{
    return this.basic;
  }

  getLogin():string{
    return this.isSignedin() ?  this.user.login : null;
  }

  getIsAdmin():boolean{
    return this.isSignedin() ?  this.user.isAdmin : null;
  }

  signUp(user:User) : Observable<any>{
    
    //this.basic = this.constructBasic(user.login, user.passw);

    //subscribe on this in singin component 
    return this.sendSignUp(user).pipe(
      tap(a=> {
        this.user = user;
        this.basic = this.constructBasic(user.login, user.passw);
      }),
      catchError(err=> {
        this.logOut();
        return throwError(err);
      }));
      /*.subscribe(
      user=>{
        this.user = user;
      },
      ()=>{
        this.user = null;
        this.basic = null;
      });*/
  }

  signIn(user:User) : Observable<any>{

    this.user = user;
    this.basic = this.constructBasic(user.login, user.passw)

    return this.sendSignIn().pipe(
      catchError(err=> {
        this.logOut();
        return throwError(err);
      }));
  }

  private sendSignUp(user:User) : Observable<any>{
    //let httpOptions = {
    //  headers : new HttpHeaders({
      //	//'Content-Type': 'application/x-www-form-urlencoded',
      ////	'WWW-Authenticate':'Basic realm="MY_OAUTH_REALM/client"'
    //}),
    ////  withCredentials : true
    //};
  
    return this.http.post<User>(this.signupUrl,user);
  }

  private sendSignIn(): Observable<any>{
    return this.http.get(this.signinUrl);
  }

  private logOut(){
    this.user = null;
    this.basic = null;
  }

  private constructBasic(user:string, passw:string): string {
    return "Basic " + btoa(`${user}:${passw}`);
  }
}
//"Basic " + btoa("username:password")

/*
const body = JSON.stringify({username: user.userName, password: user.password});

   let headers = new HttpHeaders();
   headers.append("Authorization", "Basic " + btoa("username:password"));
   headers.append("Content-Type", "application/x-www-form-urlencoded");

   this.http.post('my url here',body, {headers: headers}).subscribe(response => {
         console.log(response);
   }, err => {
      console.log("User authentication failed!");
   });
   */