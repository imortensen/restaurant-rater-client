import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Restaurant } from '../restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { AuthenticationService } from '../services/authentication.service';
import { ReviewService } from '../services/review.service';
import { Review } from '../review';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: Restaurant;
  currentUserReview: Review;
  reviews: Review[];
  review: Review;
  reviewsCount: number;
  user: User;
  placeUrl: 'https://www.google.com/maps/place/?q=place_id:'; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RestaurantService,
    private reviewService: ReviewService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit():void {
    this.getRestaurant();
  }

  getRestaurant():void  {
    // The route.snapshot is a static image of the route information shortly after the component was created.
    // The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
    // Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be.
    //const id = +this.route.snapshot.paramMap.get('id');
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getRestaurant(id).subscribe(restaurant => { this.restaurant = restaurant; console.log('restaurant: ' + JSON.stringify(this.restaurant)); this.getReviewforCurrentUser() });
  }

  getReviewforCurrentUser():void {
    let restaurant = this.restaurant;
    let user = this.authenticationService.currentUserValue;
    console.log("user in getRfCU: " + user.username); 
    console.log("user id in getRfCU: " + user._id); 
    console.log("user token in getRfCU: " + user.token);
    this.reviewService.getReviewforRestaurantandUser(restaurant, user).subscribe(currentUserReview => { this.currentUserReview = currentUserReview[0];  this.getReviewsforRestaurant() });
  }

  getReviewsforRestaurant():void {
    let restaurant = this.restaurant;
    this.reviewService.getReviewsforRestaurant(restaurant).subscribe(reviews => { this.reviews = reviews; console.log('reviews: ' + JSON.stringify(this.reviews))});
  }

  goBack() {
    this.router.navigate(['/restaurant-list']);
  }

}
