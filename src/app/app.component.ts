import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { Book, BookDetails } from './interfaces/interface';
import { AddOrEditBookComponent } from './add-or-edit-book/add-or-edit-book.component';
import { SharedModule } from './shared.module';
import {
  MatDialog
} from '@angular/material/dialog';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { FooterComponent } from './footer/footer.component';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    AuthorDetailsComponent,
    BookListComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'book-viewer';
  bookDetails!: BookDetails;
  currentBookIndex!: number;
  subscription !: Subscription;

  constructor(
    private apiService: ApiService,
    private readonly dialog: MatDialog,
    private readonly snackBar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchBookDetails();
  }

  /** Call api to get author and book details */
  fetchBookDetails() {
    this.subscription = this.apiService.getBooksDetails().subscribe({
      next: (response: BookDetails) => {
        this.bookDetails = response;
      },
      error: (err) => {
        this.snackBar.open(err?.statusText, 'X', {
          duration: 3000
        })
      },
    });
  }

  /**
   * Open modal to add new book
   */
  openAddBookModal() {
    let modelRef = this.dialog.open(AddOrEditBookComponent, {
      width: '400px',
    });
    modelRef.componentInstance.bookDataSubmit.subscribe((formValues : Book) => {
      this.addNewBook(formValues);
    });
  }

  /**
   * 
   * @param formValues 
   * @returns 
   * 
   * Add a new book to bookDetails.data.books array
   */
  addNewBook(formValues: Book) {
    if(!formValues) return

    const newBook: Book = {
      title: formValues?.title,
      PublishDate: formValues?.PublishDate,
      purchaseLink: formValues?.purchaseLink,
      imageUrl: formValues?.imageUrl,
    };

    if (!newBook) return;
    this.bookDetails?.data?.books?.unshift(newBook);

    this.dialog.closeAll();
  }

  /**
   * unsubscribed to prevent memory leak
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
