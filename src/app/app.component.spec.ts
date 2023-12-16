import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ApiService } from './services/api.service';
import { AddOrEditBookComponent } from './add-or-edit-book/add-or-edit-book.component';
import { SharedModule } from './shared.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { Book } from './interfaces/interface';

class MockMatDialog {
  open() {
    return {
      componentInstance: { bookDataSubmit: of({}) },
      afterClosed: () => of({}),
    };
  }

  closeAll() {
    // Mock implementation
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;
  let dialog: MatDialog;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, SharedModule, MatSnackBarModule, AppComponent],
      providers: [
        { provide: MatDialog, useClass: MockMatDialog },
        MatSnackBar,
        provideHttpClient()
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should open add book modal', () => {
    spyOn(dialog, 'open').and.callThrough();

    component.openAddBookModal();

    expect(dialog.open).toHaveBeenCalledWith(AddOrEditBookComponent, {
      width: '400px',
    });
  });

  it('should add a new book', () => {
    const formValues = {
      title: 'New Book',
      PublishDate: '2023',
      purchaseLink: 'https://example.com',
      imageUrl: 'https://example.com/image.jpg',
    };

    component.bookDetails = {
      data : {
        author : '',
        birthday : '',
        birthPlace : '',
        books : [
          {} as Book
        ] 
      },
      status : ''
    }

    component.addNewBook(formValues);

    expect(component.bookDetails?.data?.books?.length).toBe(2);
    expect(component.bookDetails?.data?.books[0]?.title).toBe('New Book');
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
