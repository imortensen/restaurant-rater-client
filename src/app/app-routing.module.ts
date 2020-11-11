import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { AddReviewComponent } from './add-review/add-review.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'restaurant-list', component: RestaurantListComponent, canActivate: [AuthGuard] },
  { path: 'restaurant/:id', component: RestaurantDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add-restaurant', component: AddRestaurantComponent, canActivate: [AuthGuard] },
  { path: 'my-reviews', component: MyReviewsComponent, canActivate: [AuthGuard] },
  { path: 'add-review', component: AddReviewComponent, canActivate: [AuthGuard] },
  { 
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true } // <-- debugging purposes only
    )
    // other imports here
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
