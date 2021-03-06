import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ArticleService } from '../article.service';
import { Article } from '../article';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

	article = new Article();
	constructor( private articleService: ArticleService,
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.getArticle();
	}

	getArticle() : void {
		if(this.route.snapshot.paramMap.has('id'))
		{
			const id = this.route.snapshot.paramMap.get('id');
			this.articleService.getArticle(id)
			.subscribe(art => this.article = art);
		}
	}

	goToArticles(): void{
		this.router.navigate(["/articles"]);
	}

	goToEditArticles(): void{
		this.router.navigate([`/articles/${this.article.id}/edit`]);
	}

	deleteArticle(art:Article){
		if(confirm("Are you sure to delete "+art.title+"?"))
			this.articleService.deleteArticle(art.id).subscribe(a=>
				this.goToArticles()
				);
	}

	isAdmin(){
		return this.authService.isAdmin();
	}
}
