import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { authGuard } from './services/authentication/auth.guard';
import { BookDetailComponent } from './components/book/book-detail/book-detail.component';
import { BookSearchComponent } from './components/book/book-search/book-search.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: MainComponent, canActivate: [authGuard] },
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "books", component: BookListComponent, canActivate: [authGuard] },
  { path: "book-detail/:id", component: BookDetailComponent, canActivate: [authGuard] },
  { path: "search", component: BookSearchComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
