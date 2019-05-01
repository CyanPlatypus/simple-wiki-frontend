import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { AppRoutingModule } from './/app-routing.module';
import { ArticleComponent } from './article/article.component';
import { SigninComponent } from './signin/signin.component';

import {FilterPipe} from './filter.pipe';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleFormComponent,
    ArticleComponent,
    SigninComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]  
})
export class AppModule { }
