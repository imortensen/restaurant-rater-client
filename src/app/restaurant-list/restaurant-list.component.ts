import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { RestaurantService } from '../services/restaurant.service'
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[];
  searchText;

  constructor( private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants(): void{
    this.restaurantService.getRestaurants().subscribe(restaurants => { this.restaurants = restaurants 
      console.log(this.restaurants)
    });
  }
}
