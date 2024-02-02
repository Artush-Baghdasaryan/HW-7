import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBook, IEditBook } from 'src/app/interfaces/book-data';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent {
  public bookForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditBookComponent>, @Inject(MAT_DIALOG_DATA) private data: IBook) {
    this.bookForm = new FormGroup({
      name: new FormControl(this.data.name, Validators.required),
      author: new FormControl(this.data.author, Validators.required)
    })
  }

  public onUpdate(): void {
    const updateBook: IEditBook = {
      name: this.bookForm.get("name")?.value,
      author: this.bookForm.get("author")?.value
    };
    this.dialogRef.close(updateBook);
  }

}
