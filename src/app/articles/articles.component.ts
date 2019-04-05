import { Component, OnInit } from '@angular/core';

import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
	selector: 'app-articles',
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

	articles : Article[] ;
	// = [
	// {id : 1, title: "Winter", author: "Sean", content:"no content here"},
	// {id : 2, title: "Fall", author: "Ella", content:"no no"}
	// ];

	constructor(private articleService : ArticleService) { }

	ngOnInit() {
		this.getArticles();
	}

	getArticles():void{
		this.articleService.getArticles()
		.subscribe(art=>this.articles = art);
	}

	addRandomArticle() : void {
		this.articleService.addRandomArticle().subscribe();
	}

}
