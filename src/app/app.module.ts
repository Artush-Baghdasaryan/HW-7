import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { NavComponent } from './components/nav/nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddBookComponent } from './components/book/add-book/add-book.component';
import { EditBookComponent } from './components/book/edit-book/edit-book.component';
import { MatDialogModule } from '@angular/material/dialog'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { authInterceptorProviders } from './services/authentication/interceptors/jwt.interceptor';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import { GenerateComponent } from './components/book/generate/generate.component';
import {MatSliderModule} from '@angular/material/slider';
import { BookDetailComponent } from './components/book/book-detail/book-detail.component';
import { BookSearchComponent } from './components/book/book-search/book-search.component';
import { MatListItemIcon } from '@angular/material/list';
import { AlertComponent } from './services/alert/alert/alert.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    NavComponent,
    BookListComponent,
    AddBookComponent,
    EditBookComponent,
    LoginComponent,
    RegisterComponent,
    GenerateComponent,
    BookDetailComponent,
    BookSearchComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatBadgeModule,
    MatSliderModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
