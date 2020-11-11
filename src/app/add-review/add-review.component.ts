import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder } from '@angular/forms'
import { Restaurant } from '../restaurant'
import { Review } from '../review'
import { ReviewService } from '../services/review.service'
import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {
  @Input() restaurant: Restaurant
  @Input() currentUserReview: Review
  addReviewForm

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ReviewService,
    private authenticationService: AuthenticationService
  ) {
    this.addReviewForm = this.formBuilder.group({
      stars: null,
      comment: '',
    })
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false
    }
  }

  ngOnInit() {
    // this.review
    // this.hero$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.service.getHero(params.get('id')))
    // );
  }

  ngOnChanges() {
    if (this.currentUserReview) {
      this.addReviewForm = this.formBuilder.group({
        stars: this.currentUserReview.stars,
        comment: this.currentUserReview.comment,
      })
    }
  }

  add(): void {
    const restaurant = this.restaurant
    const stars = this.addReviewForm.get('stars').value
    const comment = this.addReviewForm.get('comment').value
    if (!this.currentUserReview) {
      this.service
        .addReview({ restaurant, stars, comment } as Review)
        .subscribe(() => {
          // trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false
          this.router.navigate([`restaurant/${this.restaurant._id}`])
        })
    } else {
      const id = this.currentUserReview._id
      this.service
        .updateReview(id, { restaurant, stars, comment } as Review)
        .subscribe()
    }
  }

  remove(): void {
    const id = this.currentUserReview._id
    console.log('id for remove: ' + this.restaurant._id)
    this.service.removeReview(id).subscribe(() => {
      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false
      this.router.navigate([`restaurant/${this.restaurant._id}`])
    })
  }

  goBack() {
    console.log('go back')
    this.router.navigate(['/restaurant-list'])
  }
}
