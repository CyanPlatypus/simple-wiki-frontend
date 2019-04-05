import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ArticleService } from '../article.service';
import { Article } from '../article';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

	article= new Article();

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router ) { }

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

  onSubmit() : void{
    if (this.article.id == null) { 
      this.articleService.addArticle(this.article)
      .subscribe(id => {
          this.article.id = id;
          this.goToArticle();
        });
      
    } else {
       this.articleService.saveArticle(this.article)
       .subscribe(() => this.goToArticle());
    }  	
    
  }

  goBack(): void {
    this.location.back();
  }

  goToArticle(): void{
    this.router.navigate([`/articles/${this.article.id}`]);
  }

}
