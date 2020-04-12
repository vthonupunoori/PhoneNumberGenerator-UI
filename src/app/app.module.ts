import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { JwPaginationComponent } from 'jw-angular-pagination';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
  MatPaginatorModule, MatButtonModule, MatCardModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent, JwPaginationComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, MatInputModule, MatPaginatorModule, MatButtonModule, MatFormFieldModule, MatCardModule,
    BrowserAnimationsModule, MatToolbarModule, MatTableModule, MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
