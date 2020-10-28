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
export class FindRestaurantService {
  private restaurantsUrl = `${environment.apiUrl}/api/find/restaurants`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) { }

  findRestaurant(keyword: string): Observable<any[]> {
    this.messageService.add('FindRestaurantService: fetched restaurants');
    const url = `${this.restaurantsUrl}?keyword='${keyword}'`;
    return this.http.get<any[]>(url)
      .pipe(
        // tap(.subscribe((v) => console.log('got new heroes list: ', v))),
        // tap(_ => console.log('fetched restaurants')),
        //console.log('fetched restaurants')
        catchError(this.handleError<any[]>('findRestaurants', []))
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
