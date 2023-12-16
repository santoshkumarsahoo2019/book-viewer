import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Book, BookDetails } from '../interfaces/interface';
import { AddOrEditBookComponent } from '../add-or-edit-book/add-or-edit-book.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnChanges{
  @Input() bookDetails !: BookDetails;
  currentBookIndex !: number;
  mobile !: boolean;

  @HostListener("window:resize", [])
  onResize() {
    const width = window.innerWidth;
    this.mobile = width < 500;
  }

  constructor(
    public dialog: MatDialog
  ){}

  /**
   * 
   * @param changes 
   * As bookDetails data fetched from api and sent from parent to this component
   * So, once parent received the bookDetails then child also get updated here
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      this.bookDetails = changes['bookDetails']['currentValue']
    }
  }

  /**
   * Sort the books title in A - Z
   */
  sortByAtoZ() {
    this.bookDetails.data.books.sort((a, b) => a.title.localeCompare(b.title));
  }

  /**
   * Sort the books title in Z - A
   */
  sortByZtoA() {
    this.bookDetails.data.books.sort((a, b) => b.title.localeCompare(a.title));
  }

  /**
   * Sort books as per the latest publish
   */
  sortByPublish() {
    this.bookDetails.data.books.sort((a, b) =>
      a.PublishDate.localeCompare(b.PublishDate)
    );
  }

  /**
   * 
   * @param purchaseLink 
   * 
   * When user clicks on buy then redirect to purchaseLink in a new tab 
   */
  onBuy(purchaseLink: string) {
    window.open(purchaseLink, '_blank');
  }

  /**
   * 
   * @param book 
   * @param index
   * When user clicks the edit button
   * then modal will open
   * @Input editBookData is passed as book 
   * @Output bookDataSubmit is subscribed to get submit form emit
   */
  onEdit(book: Book, index: number) {
    this.currentBookIndex = index;
    let modalRef = this.dialog.open(AddOrEditBookComponent, {
      width: '400px',
    });
    modalRef.componentInstance.editBookData = book;
    modalRef.componentInstance.bookDataSubmit.subscribe((formvalues : any) => {
      this.updateBook(formvalues);
    });
  }

  /**
   * 
   * @param formValues 
   * @returns 
   * 
   * update the book details as per the index
   */
  updateBook(formValues: any) {
    const editedBook: Book = {
      title: formValues.title,
      PublishDate: formValues.publishYear,
      purchaseLink: formValues.buyLink,
      imageUrl: formValues.imageUrl,
    };

    if (!editedBook) return;
    this.bookDetails.data.books[this.currentBookIndex] = editedBook;

    this.dialog.closeAll();

  }

  /**
   * 
   * @param index 
   * 
   * delete book as per the index
   */
  onDelete(index : number){
    const confirmText = `Do you really wants to Delete !! ${this.bookDetails.data.books[index].title}`
    if(confirm(confirmText))
    this.bookDetails.data.books.splice(index , 1)
  }
}
