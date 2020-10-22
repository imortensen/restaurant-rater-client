import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Restaurant } from '../restaurant';
import { Review } from '../review';
import { ReviewService } from '../services/review.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit{
  @Input() restaurant: Restaurant;
  @Input() currentUserReview: Review;
  addReviewForm;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ReviewService,
    private authenticationService: AuthenticationService
    ) { 
    this.addReviewForm = this.formBuilder.group({
      stars: null,
      comment: ''
    });
  }

  ngOnInit() {
    // this.review
    // this.hero$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.service.getHero(params.get('id')))
    // );
  }

  ngOnChanges() {
    if(this.currentUserReview){
      this.addReviewForm = this.formBuilder.group({
        stars: this.currentUserReview.stars,
        comment: this.currentUserReview.comment
      });
    }
  }

  add(): void {
    const id = this.currentUserReview._id
    let reviewer = this.authenticationService.currentUserValue;
    let restaurant = this.restaurant;
    let stars = this.addReviewForm.get('stars').value;
    let comment = this.addReviewForm.get('comment').value;
    if(!this.currentUserReview){
      this.service.addReview({ restaurant, stars, comment, reviewer } as Review)
      .subscribe(() => this.goBack());
    } else {
      this.service.updateReview(id, { restaurant, stars, comment} as Review)
      .subscribe(() => this.goBack());  
    }
    
  }

  goBack() {
    this.router.navigate(['/restaurant-list']);
  }

}
