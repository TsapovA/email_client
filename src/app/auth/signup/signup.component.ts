import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../services/auth.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-singup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private matchPassword: MatchPassword,
              private uniqueUsername: UniqueUsername
  ) { }

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/)
    ], [ this.uniqueUsername.validate ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/)
    ])
    }, { validators: [ this.matchPassword.validate ] });

  ngOnInit(): void {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signup(this.authForm.value).subscribe({
      next: response => {
        this.router.navigateByUrl('/inbox');
      },
      error: err => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true});
        }
      }
      });
  }
}
