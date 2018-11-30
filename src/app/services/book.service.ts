import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { BOOKS } from './mock-books';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getBooks(): Observable<Book[]> {
    let url = 'http://localhost:9197/api/Products';
    return this.http.get(url)
      .pipe(
        map((response: any) => { return response.Products }),
        catchError(this.handleError('getBooks', []))
      )
  }

  getBook(id: number): Observable<Book> {
    let url = `http://localhost:9197/api/Products/${id}`;
    return this.http.get(url)
      .pipe(
        map((response: any) => { return response }),
        catchError(this.handleError('getBook', {}))
      )
  }

  updateBook(book: Book): Observable<any> {
    let body = JSON.stringify({ BookDetails: book });
    let url = 'http://localhost:9197/api/subroutine/UpdateBookFromREST';
    return this.http.post<Book>(url, body, httpOptions)
      .pipe(
        tap( book => console.log(book)),
        catchError(this.handleError('updateBook', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }
}
