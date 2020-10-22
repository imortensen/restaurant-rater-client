import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Restaurant } from '../restaurant';
import { MessageService } from '../message.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private restaurantsUrl = `${environment.apiUrl}/api/restaurant`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) { }

  getRestaurants(): Observable<Restaurant[]> {
    this.messageService.add('RestaurantService: fetched restaurants');
    console.log('test: ' + this.http.get<Restaurant[]>(this.restaurantsUrl))
    return this.http.get<Restaurant[]>(this.restaurantsUrl)
      .pipe(
        // tap(.subscribe((v) => console.log('got new heroes list: ', v))),
        // tap(_ => console.log('fetched restaurants')),
        //console.log('fetched restaurants')
        catchError(this.handleError<Restaurant[]>('getRestaurant', []))
      );
  }

  getRestaurant(id: string): Observable<Restaurant> {
    this.messageService.add(`Restaurant Service: fetched restaurant id=${id}`);
    const url = `${this.restaurantsUrl}/${id}`;
    return this.http.get<Restaurant>(url).pipe(
      //tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Restaurant>(`getRestaurant id=${id}`))
    );
  }

  addRestaurant (restaurant: Restaurant): Observable<Restaurant> {
    const url = `${this.restaurantsUrl}`;
    return this.http.post<Restaurant>(url, restaurant, this.httpOptions).pipe(
      //tap((newRestaurant: Restaurant) => this.log(`added restaurant w/ id=${newRestaurant.id}`)),
      catchError(this.handleError<Restaurant>('addRestaurant'))
    );
  }

  updateRestaurant (restaurant: Restaurant): Observable<any> {
    return this.http.put(this.restaurantsUrl, restaurant, this.httpOptions).pipe(
      //tap(_ => this.log(`updated restaurant id=${restaurant.id}`)),
      catchError(this.handleError<any>('updateRestaurant'))
    );
  }

  /* GET restaurants whose name contains search term */
  searchRestaurants(term: string): Observable<Restaurant[]> {
    if (!term.trim()) {
      // if not search term, return empty restaurant array.
      return of([]);
    }
    return this.http.get<Restaurant[]>(`${this.restaurantsUrl}/?name=${term}`).pipe(
      //tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Restaurant[]>('searcRestaurants', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}
