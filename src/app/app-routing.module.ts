import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { SigninComponent } from './signin/signin.component'
import { ArticlesComponent } from './articles/articles.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleComponent } from './article/article.component';
import { from } from 'rxjs';

const routes : Routes = [
	{path : 'signinup', component : SigninComponent},
	{path : 'articles', component : ArticlesComponent},
	{path : 'articles/add', component : ArticleFormComponent},
	{path : 'articles/:id/edit', component : ArticleFormComponent},
	{path : 'articles/:id', component : ArticleComponent},
	{path : '', redirectTo : '/signinup', pathMatch: 'full'}
];

@NgModule({
	imports : [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
