import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { Restaurant } from '../restaurant'
import { environment } from '@environments/environment'
import { Review } from '../review'
import { User } from '../user'

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private reviewsUrl = `${environment.apiUrl}/api/review`
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.reviewsUrl).pipe(
      //tap(_ => this.log('fetched restaurants')),
      catchError(this.handleError<Review[]>('getReview', []))
    )
  }

  getReview(id: string): Observable<Review> {
    const url = `${this.reviewsUrl}/${id}`
    return this.http.get<Review>(url).pipe(
      //tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Review>(`getReview id=${id}`))
    )
  }

  getReviewsforRestaurant(restaurant: Restaurant): Observable<Review[]> {
    const url = `${this.reviewsUrl}?restaurant=${restaurant._id}`
    console.log('review url for restaurant: ' + url)
    return this.http
      .get<Review[]>(url)
      .pipe(catchError(this.handleError<Review[]>(`getReviewsforRestaurant`)))
  }

  getReviewforRestaurantandUser(
    restaurant: Restaurant,
    user: User
  ): Observable<Review> {
    const url = `${this.reviewsUrl}/myreviews?restaurant=${restaurant._id}`
    console.log('review url: ' + url)
    return this.http
      .get<Review>(url)
      .pipe(
        catchError(this.handleError<Review>(`getReviewforRestaurantandUser`))
      )
  }

  getMyReviews(): Observable<Review[]> {
    const url = `${this.reviewsUrl}/myreviews`
    console.log('review url: ' + url)
    return this.http
      .get<Review[]>(url)
      .pipe(catchError(this.handleError<Review[]>(`getMyReviews`)))
  }

  addReview(review: Review): Observable<any> {
    const url = `${this.reviewsUrl}`
    console.log('review url: ' + url)
    console.log('review: ' + JSON.stringify(review))
    // const newReview = {
    //   restaurant: review.restaurant._id,
    //   stars: review.stars,
    //   comment: review.comment
    // }
    console.log('new review: ' + JSON.stringify(review))
    return this.http.post<Review>(url, review, this.httpOptions).pipe(
      tap((review: Review) => console.log(`added review w/ _id=${review._id}`)),
      catchError(this.handleError<Review>('addReview'))
    )
    // return this.http.post<any>(url, newReview, this.httpOptions);
  }

  updateReview(id: string, review: Review): Observable<any> {
    console.log('update review service')
    const url = `${this.reviewsUrl}/${id}`
    return this.http.put(url, review, this.httpOptions).pipe(
      //tap(_ => this.log(`updated restaurant id=${restaurant.id}`)),
      catchError(this.handleError<any>('updateReview'))
    )
  }

  removeReview(id: string): Observable<any> {
    const url = `${this.reviewsUrl}/${id}`
    console.log('remove url: ' + url)
    // return this.http.delete(url, this.httpOptions).pipe(
    //   //tap(_ => this.log(`updated restaurant id=${restaurant.id}`)),
    //   tap(_ => console.log('test')),
    //   catchError(this.handleError<any>('removeReview'))
    // );
    return this.http.delete(url)
  }

  /* GET restaurants whose name contains search term */
  searchReviews(term: string): Observable<Review[]> {
    if (!term.trim()) {
      // if not search term, return empty restaurant array.
      return of([])
    }
    return this.http.get<Review[]>(`${this.reviewsUrl}/?name=${term}`).pipe(
      //tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Review[]>('searcReviews', []))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }
}
