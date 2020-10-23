import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import {Sort} from '@angular/material/sort';

import { ReviewService } from '../services/review.service'
import { Review } from '../review';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css'],
})

export class MyReviewsComponent implements OnInit {
  reviews: Review[];
  searchText;
  sortedReviews;

  constructor( private reviewService: ReviewService) { 
    // this.sortedReviews = this.reviews.map((review) => ({
    //   ..._.pick(review, ['stars', 'updatedAt']),
    //   restaurant: _.get(review, 'restaurant.name')
    // }));
    // this.sortedReviews =this.sortedReviews.slice();
  }

  ngOnInit(): void {
    this.getMyReviews();
  }

  getMyReviews(): void{
    this.reviewService.getMyReviews().subscribe(reviews => { this.reviews = reviews
      this.sortedReviews = this.reviews.map((review) => ({
        ..._.pick(review, ['stars', 'comment', 'updatedAt']),
        restaurant: _.get(review, 'restaurant.name'),
        restaurantId: _.get(review, 'restaurant._id')
      }));
      this.sortedReviews = this.sortedReviews.slice();
      console.log(this.sortedReviews)
    });
  }

  
    sortData(sort: Sort) {
      console.log('test')
      const data = this.sortedReviews.slice();
      if (!sort.active || sort.direction === '') {
        this.sortedReviews = data;
        return;
      }
  
      this.sortedReviews = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'restaurant': return compare(a.restaurant, b.restaurant, isAsc);
          case 'stars': return compare(a.stars, b.stars, isAsc);
          case 'updatedAt': return compare(a.updatedAt, b.updatedAt, isAsc);
          default: return 0;
        }
      });
    }
  
}
  function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }



