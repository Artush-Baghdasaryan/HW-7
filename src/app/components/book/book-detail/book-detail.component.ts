import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IBook, IEditBook } from 'src/app/interfaces/book-data';
import { AlertService } from 'src/app/services/alert/alert.service';
import { BookService } from 'src/app/services/book.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  public book: IBook | null = null;
  public bookEditing: boolean = false;
  public editForm: FormGroup;

  constructor(private rout: ActivatedRoute,
    private bookService: BookService,
    private routeService: RoutingService,
    private alertService: AlertService) {
    this.editForm = new FormGroup({
      name: new FormControl(this.book?.name, Validators.required),
      author: new FormControl(this.book?.author, Validators.required)
    })
  }

  public ngOnInit(): void {
    this.getBook();
  }

  public getBook(): void {
    const bookId = this.rout.snapshot.paramMap.get("id");
    if (!bookId) {
      return;
    }

    this.bookService.getBookById(bookId).subscribe(book => this.book = book);
  }

  private get nameControl() {
    return this.editForm.controls['name'];
  }

  private get authorControl() {
    return this.editForm.controls["author"];
  }

  public onBookEdit(): void {
    this.nameControl.setValue(this.book?.name);
    this.authorControl.setValue(this.book?.author);
    this.bookEditing = true;
  }

  public onBookSave(): void {
    if (!this.book) {
      return;
    }

    const bookUpdate: IEditBook = {
      name: this.nameControl.value,
      author: this.authorControl.value
    }

    this.bookService.updateBook(this.book?.id, bookUpdate).subscribe(updatedBook => {
      this.getBook();
      this.bookEditing = false;
      this.alertService.showAlert({
        title: "Edit book",
        text: "Book has been updated successfully!",
        yesButtonText: "Close"
      });
    });
  }

  public onBookDelete(): void {
    if (!this.book) return;
    this.alertService.showConfirmation({
      title: "Delete book",
      text: `Are you sure, you want to delete book ${this.book.name}`,
      yesButtonText: "Yes",
      cancelButtonText: "No",
      yesFunction: async () => {
        await this.bookService.deleteBook(this.book!.id).subscribe(() => this.routeService.redirectToBooks());
        this.alertService.showAlert({
          title: "Delete book",
          text: "Book has been deleted successfully!",
          yesButtonText: "Close"
        });
      }
    });
  }
}
