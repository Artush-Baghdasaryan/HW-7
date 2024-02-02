import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { IBook } from 'src/app/interfaces/book-data';
import { BookService } from 'src/app/services/book.service';
import { MatListItemAvatar } from '@angular/material/list';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  public searchForm: FormGroup;
  public bookList: IBook[] = [];
  public searchChanges = new EventEmitter();

  constructor(private bookService: BookService) {
    this.searchForm = new FormGroup({
      search: new FormControl("")
    });
  }

  public ngOnInit(): void {
    this.searchChanges.pipe(debounceTime(500)).subscribe(() => {
      this.onSearch();
    })
  }

  public searchContextChanges() {
    this.searchChanges.emit();
  }

  public isAnySearchContent(): boolean {
    return this.searchForm.controls['search'].value;
  }

  public onSearch(): void {
    const searchInput = this.searchForm.controls["search"].value;
    this.bookService.getAllBooks().subscribe(books => {
      this.bookList = books.filter(b => {
        const bookName = b.name.toLowerCase();
        const authorName = b.author.toLowerCase();
        const searchString = searchInput.toLowerCase();
        return bookName.includes(searchString) || authorName.includes(searchString);
      });
    })
  }
}
