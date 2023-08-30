import { validationErrorsSelector } from './../../store/selectors';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.action';
import { Observable } from 'rxjs';
import { isSubmittingSelector } from '../../store/selectors';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthResponseInterface } from '../../types/authResponse.interface';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { BackendErrorInterface } from 'src/app/shared/types/backendError.interface';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorInterface | null>

  constructor(private fb: FormBuilder, private store: Store, private authSr: AuthService) {

  }

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store               // получение состояния из стора
      .pipe(select(isSubmittingSelector))
    
    this.backendErrors$ = this.store            // получение ошибок из стора
      .pipe(select(validationErrorsSelector))
      
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: '',
      password: ''
    })
  }

  onSubmit(): void {
    let userForRegister: RegisterRequestInterface = {
      user: this.form.value
    }

    this.store.dispatch(registerAction({request: userForRegister}))

  }
}
