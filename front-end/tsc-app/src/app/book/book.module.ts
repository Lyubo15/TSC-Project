import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeBookComponent } from './make-book/make-book.component';
import { BookRoutingModule } from './book-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { BookService } from './book.service';

@NgModule({
  declarations: [MakeBookComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BookRoutingModule,
    MaterialModule
  ],
  providers: [BookService]
})
export class BookModule { }

