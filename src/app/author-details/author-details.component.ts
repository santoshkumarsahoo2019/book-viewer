import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AuthorDetails } from '../interfaces/interface';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.scss'
})
export class AuthorDetailsComponent {
  @Input() authorDetails !: AuthorDetails
}
