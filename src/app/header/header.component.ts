import { Component, EventEmitter, Output } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatGridListModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() openModal = new EventEmitter()

  /**
   * Emit message to open Add book modal from parent component
   */
  emitToParent(){
    this.openModal.emit(true)
  }
}
