import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';

import { ReviewService } from '../services/review.service'
import { Review } from '../review';

export type SortColumn = keyof Review | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css'],
})

export class MyReviewsComponent implements OnInit {
  reviews: Review[];
  searchText;
  sortableReviews;

  constructor( private reviewService: ReviewService) { }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  ngOnInit(): void {
    this.getMyReviews();
  }

  getMyReviews(): void{
    this.reviewService.getMyReviews().subscribe(reviews => { this.reviews = reviews
      console.log(this.reviews)
    });
  }

  onSort({column, direction}: SortEvent) {
    this.sortableReviews = _.map(this.reviews, o => _.omit(o, ['_id', 'reviewer']));
    console.log("new array: " + this.sortableReviews)

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting restaurants
    if (direction === '' || column === '') {
      this.sortableReviews = this.sortableReviews;
    } else {
      this.sortableReviews = [...this.sortableReviews].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

}