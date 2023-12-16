import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HeaderComponent } from './header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDividerModule,
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  exports: [
    MatGridListModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDividerModule,
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  declarations: [],
})
export class SharedModule {}
