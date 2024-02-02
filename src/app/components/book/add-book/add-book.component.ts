import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IAddBook, IBook } from 'src/app/interfaces/book-data';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  public bookForm = new FormGroup({
    name: new FormControl("", Validators.required),
    author: new FormControl("", Validators.required)
  })

  constructor(public dialogRef: MatDialogRef<AddBookComponent>) {

  }

  public onClose(): void {
    this.dialogRef.close(false);
  }

  public onAdd(): void {
    const book: IAddBook = {
      author: this.bookForm.get("author")?.value ?? "Author",
      name: this.bookForm.get("name")?.value ?? "Book name"
    }

    this.dialogRef.close(book);
  }
}
