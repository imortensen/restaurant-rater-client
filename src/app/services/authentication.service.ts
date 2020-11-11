import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

import { User } from '../user'
import { environment } from '@environments/environment'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    )
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  login(username, password) {
    return this.http
      .post<any>(`${environment.apiUrl}/signin`, { username, password })
      .pipe(
        map((user) => {
          //store user info and jwt token in local storage to keep user logged in between page refreshes
          user.username = username
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.currentUserSubject.next(user)
          return user
        })
      )
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null)
  }

  postGoogleLogin(socialData: any) {
    // console.log('social data: ' + JSON.stringify(socialData, null, '\t'))
    console.log('auth token: ' + socialData.authToken)
    const accessToken = { access_token: socialData.authToken }
    // remove user from local storage and set current user to null
    return this.http
      .post<any>(`${environment.apiUrl}/oauth/google`, accessToken)
      .pipe(
        map((user) => {
          //store user info and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.currentUserSubject.next(user)
          return user
        })
      )
    // return this.http.get(`${environment.apiUrl}/api/restaurant`)
  }
}
