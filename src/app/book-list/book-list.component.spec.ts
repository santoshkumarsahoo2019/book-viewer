import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { BookListComponent } from './book-list.component';
import { SimpleChange } from '@angular/core';

class MockMatDialog {
  open() {
    return {
      componentInstance: { bookDataSubmit: of({}) },
      afterClosed: () => of({}),
    };
  }

  closeAll(){
    return
  }
}

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let dialog: MatDialog;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, SharedModule, BookListComponent],
      providers: [
        { provide: MatDialog, useClass: MockMatDialog },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle ngOnChanges correctly', () => {
    const changes = {
      bookDetails: {
        currentValue: {
          data: {
            author : '',
            birthPlace : '',
            birthday : '',
            books: [
              { title: 'Book 1', PublishDate: '2021', purchaseLink: '', imageUrl: '' },
              { title: 'Book 2', PublishDate: '2022', purchaseLink: '', imageUrl: '' },
            ],
          },
          status : ''
        }
      } as SimpleChange
    }

    component.ngOnChanges(changes);

    expect(component.bookDetails).toEqual(changes.bookDetails.currentValue);
  });

  it('should sort books by A to Z', () => {
    component.bookDetails = { 
      data: {
        author : '',
        birthday : '',
        birthPlace : '',
        books: [
          { title: 'B', imageUrl :'', purchaseLink : '', PublishDate : ''  },
          {  title: 'A', imageUrl :'', purchaseLink : '', PublishDate : '' }
        ] 
      },
      status : ''
    };
    component.sortByAtoZ();
    expect(component.bookDetails.data.books[0].title).toBe('A');
  });

  it('should sort books by Z to A', () => {
    component.bookDetails = {
      data: {
        author : '',
        birthday : '',
        birthPlace : '',
        books: [
          { title: 'A', imageUrl: '', purchaseLink: '', PublishDate: '' },
          { title: 'B', imageUrl: '', purchaseLink: '', PublishDate: '' },
        ],
      },
      status : ''
    };
    component.sortByZtoA();
    expect(component.bookDetails.data.books[0].title).toBe('B');
  });

  it('should sort books by Publish', () => {
    component.bookDetails = {
      data: {
        birthday : '',
        birthPlace : '',
        author : '',
        books: [
          {  title: 'Book 1', imageUrl :'', purchaseLink : '', PublishDate : '2022-02-02' },
          {  title: 'Book 2', imageUrl :'', purchaseLink : '', PublishDate : '2021-01-01' },
        ],
      },
      status : ''
    };
    component.sortByPublish();
    expect(component.bookDetails.data.books[0].title).toBe('Book 2');
  });

  it('should open buy link in a new tab', () => {
    spyOn(window, 'open');
    component.onBuy('https://example.com');
    expect(window.open).toHaveBeenCalledWith('https://example.com', '_blank');
  });


  it('should update book details', () => {
    spyOn(dialog, 'closeAll');
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}) });
    spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);
  
    component.bookDetails = {
      data: {
        birthday: '',
        birthPlace: '',
        author: '',
        books: [
          { title: 'B', imageUrl: '', purchaseLink: '', PublishDate: '2022-02-02' },
          { title: 'B', imageUrl: '', purchaseLink: '', PublishDate: '2021-01-01' },
        ],
      },
      status: '',
    };
    const formValues = { title: 'Updated Book', publishYear: '2023', buyLink: '', imageUrl: '' };
  
    component.currentBookIndex = 1;
    component.updateBook(formValues);
  
    expect(component.bookDetails.data.books[1].title).toBe('Updated Book');
    expect(dialog.closeAll).toHaveBeenCalled();
  });
  
  it('should delete book', () => {
    component.bookDetails = {
      data: {
        birthday : '',
        birthPlace : '',
        author : '',
        books: [
          {  title: 'Book 1', imageUrl :'', purchaseLink : '', PublishDate : '2022-02-02' },
          {  title: 'Book 2', imageUrl :'', purchaseLink : '', PublishDate : '2021-01-01' },
        ],
      },
      status : ''
    };

    component.onDelete(0);

    expect(component.bookDetails.data.books.length).toBe(1);
    expect(component.bookDetails.data.books[0].title).toBe('Book 2');
  });
});
