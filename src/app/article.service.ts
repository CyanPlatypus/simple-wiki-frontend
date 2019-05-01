import { Injectable } from '@angular/core';
import{Observable, of} from 'rxjs';
import{HttpClient, HttpHeaders} from'@angular/common/http';

import {Article} from './article';

import {ARTICLESENDPOINT} from './wikiendpoints'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

	//'http://192.168.0.99/articles.php'
  //'http://localhost/articles.php'
  //'http://192.168.0.99/articles.php';
	private articlesUrl = ARTICLESENDPOINT//'http://localhost:5000/articles';

  constructor(private httpClient: HttpClient) { }

  getArticles() : Observable<Article[]> {
  	return this.httpClient.get<Article[]>(this.articlesUrl);
  }

  getArticle(id:string) : Observable<Article>{
    return this.httpClient.get<Article>(`${this.articlesUrl}/${id}`);
  }

  addRandomArticle() : Observable<any>{
  	let art = {
			title : 'das_ist_title',
			author : 'Great Sir Nicolas',
			content : 'empty_it_is'
		};

  	return this.httpClient.post<any>(this.articlesUrl, art);
  }

  addArticle(art: Article) : Observable<any>{
  	return this.httpClient.post<any>(this.articlesUrl, art);
  }

  saveArticle(art: Article) : Observable<any>{
    return this.httpClient.put(`${this.articlesUrl}/${art.id}`, art);
  }

  deleteArticle(id: number) : Observable<any>{
    return this.httpClient.delete(`${this.articlesUrl}/${id}`);
  }
}
