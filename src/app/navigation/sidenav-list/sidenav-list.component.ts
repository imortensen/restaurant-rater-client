import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { User } from '../../user'
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter()

  currentUser: User

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    )
  }

  ngOnInit() {}

  logout(): void {
    this.authenticationService.logout()
    this.router.navigate(['/login'])
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit()
  }
}
