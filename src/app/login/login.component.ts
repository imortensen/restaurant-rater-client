import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: String;
  submitted = false;
  loading = false;
  accessToken;
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authService: SocialAuthService
  ) { 
    //redirect to home if not already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    //get return url from router paramenter or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    // });
    console.log('user: ' + this.user)
      this.loading = true;
      this.authenticationService.postGoogleLogin(this.user).subscribe((data)=>{
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
        }
        // if(res['success']){
        //   this.router.navigate([this.returnUrl])
        // } else {
        //   console.log('res: ' + JSON.stringify(res))
        //   console.log('Error login with google')
        // }
      );
    })
  }

  signOut(): void {
    this.authService.signOut();
  }

  login(){
    this.submitted = true;

    //do not continue if invalid form
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
        }
      );
  }
}
