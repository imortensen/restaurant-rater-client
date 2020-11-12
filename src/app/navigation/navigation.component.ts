import { Component, EventEmitter, Output } from '@angular/core'
import {
  faBell,
  faSearch,
  faUser,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons'
import { User } from '../user'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  @Output() public sidenavToggle = new EventEmitter()

  faSearch = faSearch
  faBell = faBell
  faUser = faUser
  faUtensils = faUtensils
  currentUser: User

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    )
  }

  logout(): void {
    this.authenticationService.logout()
    this.router.navigate(['/login'])
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit()
  }
}
