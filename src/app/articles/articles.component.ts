import { Component, OnInit } from '@angular/core';

import { Article } from '../article';
import { ArticleService } from '../article.service';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-articles',
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

	articles : Article[] ;
	filter:string;
	fieldname= "title";
	// = [
	// {id : 1, title: "Winter", author: "Sean", content:"no content here"},
	// {id : 2, title: "Fall", author: "Ella", content:"no no"}
	// ];

	constructor(private articleService : ArticleService, 
		private authService : AuthService) { }

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

	deleteArticle(art:Article){
		if(confirm("Are you sure to delete "+art.title+"?"))
			this.articleService.deleteArticle(art.id).subscribe(a=>
				this.getArticles()
				);
	}

	isAdmin(){
		return this.authService.isAdmin();
	}
}
