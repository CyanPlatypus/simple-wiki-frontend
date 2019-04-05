//token.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    if(this.auth.isSignedin()){    
      const dupReq = request.clone(
	    	{ headers: request.headers.set(
	    		'Authorization', this.auth.getAuth()) 
	    });
      return next.handle(dupReq);
    }
    else
      return next.handle(request);
  }
  
}