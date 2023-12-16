import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddOrEditBookComponent } from './add-or-edit-book.component';

describe('AddOrEditBookComponent', () => {
  let component: AddOrEditBookComponent;
  let fixture: ComponentFixture<AddOrEditBookComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        MatCardModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AddOrEditBookComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form in ngOnInit', () => {
    component.ngOnInit();
    expect(component.bookForm).toBeTruthy();
  });

  it('should set form values in ngAfterViewInit for editBookData', () => {
    component.editBookData = {
      title: 'Sample Title',
      PublishDate: '2022',
      imageUrl: 'sample.jpg',
      purchaseLink: 'sample-link',
    };
    component.ngAfterViewInit();

    expect(component.buttonText).toBe('Edit Book');
    expect(component.bookForm.value).toEqual({
      title: 'Sample Title',
      PublishDate: '2022',
      imageUrl: 'sample.jpg',
      purchaseLink: 'sample-link',
    });
  });

  it('should emit bookDataSubmit event on form submission when form is valid', () => {
    spyOn(component.bookDataSubmit, 'emit');
    component.bookForm.setValue({
      title: 'Sample Title',
      PublishDate: '2022',
      imageUrl: 'https://www.demourl.com',
      purchaseLink: 'https://www.demourl.com',
    });

    component.onSubmit();

    expect(component.bookDataSubmit.emit).toHaveBeenCalledWith({
      title: 'Sample Title',
      PublishDate: '2022',
      imageUrl: 'https://www.demourl.com',
      purchaseLink: 'https://www.demourl.com',
    });
  });

});
