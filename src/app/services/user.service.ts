import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { User } from '../user'
import { environment } from '@environments/environment'
import { catchError } from 'rxjs/operators'
import { Observable, of } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersUrl = `${environment.apiUrl}/users`
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }
  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/signup`, user)
  }

  getReviewer(id: string): Observable<User> {
    const url = `${this.usersUrl}/${id}`
    return this.http.get<User>(url).pipe(
      //tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
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
