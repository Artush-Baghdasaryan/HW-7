import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IBook, IEditBook } from 'src/app/interfaces/book-data';
import { Animations } from 'src/app/shared/classes/animations';
import { AddBookComponent } from '../add-book/add-book.component';
import { BookService } from 'src/app/services/book.service';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { GenerateComponent } from '../generate/generate.component';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  animations: [Animations.appears]
})
export class BookListComponent implements OnInit {

  public booksList: IBook[] = [];
  public hoveredBookId: string = "";
  
  constructor(private bookService: BookService, public dialog: MatDialog, private alertService: AlertService) {

  }

  public ngOnInit(): void {
      this.loadBooks();
  }

  public loadBooks(): void {
    this.bookService.getAllBooks().subscribe(response => {
      this.booksList = response;
    })
  }

  public onMouseEnter(event: MouseEvent): void {
    const hoveredBook = event.target as HTMLElement;
    this.toggleAnimatingClass(hoveredBook, true);
    this.hoveredBookId = hoveredBook.id;

  }

  private toggleAnimatingClass(book: HTMLElement, toggle: boolean): void {
    const hoverLayer = book.querySelector(".hover-layer") as HTMLElement;
    hoverLayer.classList.toggle("animating", toggle);
  } 

  public onMouseLeave(event: MouseEvent): void {
    const book = event.target as HTMLElement;
    if (this.hoveredBookId === book.getAttribute("id")) {
      this.toggleAnimatingClass(book, false);
      this.hoveredBookId = "";
    }
  }

  public isBookHovered(book: IBook): string {
    return this.hoveredBookId === book.id ? "hover" : "noHover";
  }

  public onAddBook(): void {
    const dialogRef = this.openDialog(AddBookComponent);

    dialogRef.afterClosed().subscribe({
      next: response => {
        this.bookService.addBook(response).subscribe((book) => {
          this.loadBooks();
          this.alertService.showAlert({
            text: `Book by name ${book.name} has been added!`,
            title: "Add book",
            yesButtonText: "Close",
          });
        });
      },
      error: response => {
        this.alertService.showAlert({
          text: `Something went wrong try again!`,
          title: "Add book",
          yesButtonText: "Ok",
        });
      }
    })
  }

  public onGenerateBooks(): void {
    const dialogRef = this.openDialog(GenerateComponent);

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (!result) {
          return;
        }
        this.bookService.generateBooks(result).subscribe(() => this.loadBooks());
        this.alertService.showAlert({
          text: `All ${result} books have been generated!`,
          title: "Generate books",
          yesButtonText: "Close",
        });
      },
      error: _ => {
        // to do
      }
    })
  }

  public onDeleteAll(): void {
    this.alertService.showConfirmation({
      title: "Deleting all books",
      text: `Are you sure you want to delete all ${this.booksList.length} books?`,
      yesButtonText: "Yes",
      cancelButtonText: "Cancel",
      yesFunction: async () => {
         await this.bookService.deleteAllBooks().subscribe(() => {
          this.loadBooks();
          this.alertService.showAlert({
            title: "",
            text: "All books have been deleted!",
            yesButtonText: "Ok"
          });
         });
      }
    })
  }

  public onBookDelete(book: IBook): void {
    this.alertService.showConfirmation({
      title: "Delete book",
      text: `Are you sure, you want to delete book ${book.name}`,
      yesButtonText: "Yes",
      cancelButtonText: "No",
      yesFunction: async () => {
        await this.bookService.deleteBook(book.id).subscribe(() => this.loadBooks());
        this.alertService.showAlert({
          title: "Delete book",
          text: "Book has been deleted successfully!",
          yesButtonText: "Close"
        });
      }
    });
  }

  public onBookEdit(book: IBook): void {
    const dialogRef = this.openDialog(EditBookComponent, book);

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (!result) {
          return;
        }
        this.bookService.updateBook(book.id, result as IEditBook).subscribe(() => this.loadBooks());
        this.alertService.showAlert({
          title: "Edit book",
          text: "Book has been updated successfully!",
          yesButtonText: "Close"
        });
      },
      error: _ => {
        // to do
      }
    })
  }

  public openDialog(component: any, data?: any): MatDialogRef<any, any> {
    const enterAnimationDuration = "0.3s";
    const exitAnimationDuration = "0.5s";

    const dialogRef = this.dialog.open(component, {
      width: "350px",
      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    });
    return dialogRef;
  }
}
