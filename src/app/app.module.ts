import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BarRatingModule } from 'ngx-bar-rating';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { MessagesComponent } from './messages/messages.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AddReviewComponent } from './add-review/add-review.component';
import { MyReviewsComponent, NgbdSortableHeader } from './my-reviews/my-reviews.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RestaurantListComponent,
    PageNotFoundComponent,
    RestaurantDetailsComponent,
    MessagesComponent,
    AddRestaurantComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    AddReviewComponent,
    MyReviewsComponent,
    NgbdSortableHeader,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    BarRatingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
