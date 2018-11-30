import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

const routes = [
  { path: '', redirectTo: '/books', pathMatch:'full' },
  { path: 'books', component: BooksComponent },
  { path: 'detail/:id', component: BookDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
