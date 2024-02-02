import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { IAddBook, IBook, IBookDto, IEditBook } from '../interfaces/book-data';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl: string = this.appConfig.apiUrl;
  private prefix: string = "books";

  constructor(private http: HttpClient, private appConfig: AppConfig) {
  }

  public getAllBooks(): Observable<IBookDto[]> {
    return this.http.get<IBookDto[]>(`${this.apiUrl}/${this.prefix}`);
  }

  public getBookById(id: string): Observable<IBookDto> {
    return this.http.get<IBookDto>(`${this.apiUrl}/${this.prefix}/${id}`);
  }

  public addBook(book: IAddBook): Observable<IBookDto> {
    return this.http.post<IBookDto>(`${this.apiUrl}/${this.prefix}`, JSON.stringify(book));
  }

  public deleteAllBooks(): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${this.prefix}`); 
  }

  public deleteBook(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${this.prefix}/${id}`);
  }

  public updateBook(id: string, book: IEditBook): Observable<IBookDto> {
    return this.http.put<IBookDto>(`${this.apiUrl}/${this.prefix}/${id}`, book);
  }

  public generateBooks(count: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.prefix}/generate/${count}`, null);
  }
}
