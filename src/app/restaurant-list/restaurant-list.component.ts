import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {Sort} from '@angular/material/sort';

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
      this.restaurants = this.restaurants.slice();
      console.log(this.restaurants)
    });
  }

  sortData(sort: Sort) {
    const data = this.restaurants.slice();
    if (!sort.active || sort.direction === '') {
      this.restaurants = data;
      return;
    }

    this.restaurants = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'restaurant': return compare(a.name, b.name, isAsc);
        case 'stars': return compare(a.stars, b.stars, isAsc);
        case 'reviews': return compare(a.reviews, b.reviews, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}