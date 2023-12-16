import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Book } from '../interfaces/interface';


@Component({
  selector: 'add-or-edit-book',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatNativeDateModule, MatFormFieldModule, MatProgressBarModule, MatInputModule, MatButtonModule, MatDatepickerModule , ReactiveFormsModule],
  templateUrl: './add-or-edit-book.component.html',
  styleUrl: './add-or-edit-book.component.scss'
})
export class AddOrEditBookComponent implements OnInit, AfterViewInit{

  @Output() bookDataSubmit = new EventEmitter();
  @Input() editBookData !: Book;
  buttonText : string = 'Add Book'

  constructor(
    private readonly formBuilder : FormBuilder
  ){}

  @ViewChild('picker') picker !: MatDatepicker<Date>;

  bookForm !: FormGroup;

  ngOnInit(): void {
    this.createBookForm();
  }

  /**
   * Edit or Add book form
   * With validation
   */
  private createBookForm() {
    const urlRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      PublishDate: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      imageUrl: ['', [ Validators.required , Validators.pattern(urlRegExp)]],
      purchaseLink: ['', [ Validators.required , Validators.pattern(urlRegExp)]],
    });
  }

  /**
   * As we are reusing this same component for Add book and Edit book
   * So, after view init if we find editBookData then form setValue is done
   */
  ngAfterViewInit(){
    if(this.editBookData){

      this.buttonText = 'Edit Book'

      this.bookForm.controls['title'].setValue(this.editBookData?.title)
      this.bookForm.controls['PublishDate'].setValue(this.editBookData?.PublishDate)
      this.bookForm.controls['imageUrl'].setValue(this.editBookData?.imageUrl)
      this.bookForm.controls['purchaseLink'].setValue(this.editBookData?.purchaseLink)
    }
  }

  /**
   * If form is valid 
   * Form value is emitted to parent component
   */
  onSubmit(): void {
    if (this.bookForm?.valid) {
      this.bookDataSubmit.emit(this.bookForm?.value)
      this.bookForm.reset();
    }
  }
}
