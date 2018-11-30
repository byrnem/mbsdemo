import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../models/book';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getBook();
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id)
      .subscribe(book => this.book = book);
  }

  save(): void {
    this.bookService.updateBook(this.book)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
