import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { BarRatingModule } from 'ngx-bar-rating'
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavigationComponent } from './navigation/navigation.component'
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component'
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component'
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { AlertComponent } from './alert/alert.component'
import { JwtInterceptor } from './helpers/jwt.interceptor'
import { ErrorInterceptor } from './helpers/error.interceptor'
import { AddReviewComponent } from './add-review/add-review.component'
import { MyReviewsComponent } from './my-reviews/my-reviews.component'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MaterialModule } from './material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login'

import { GoogleLoginProvider } from 'angularx-social-login'
import { HomeComponent } from './home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidenavListComponent,
    RestaurantListComponent,
    PageNotFoundComponent,
    RestaurantDetailsComponent,
    AddRestaurantComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    AddReviewComponent,
    MyReviewsComponent,
    HomeComponent,
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
    BarRatingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    SocialLoginModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '859271856157-j82hrobufiarmuti4078elhrechovr8n.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
