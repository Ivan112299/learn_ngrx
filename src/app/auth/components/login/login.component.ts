import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginAction } from '../../store/actions/login.action';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { BackendErrorInterface } from 'src/app/shared/types/backendError.interface';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form!: FormGroup
  isSubmitting$: Observable<boolean> | undefined
  backendErrors$!: Observable<BackendErrorInterface | null>

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ){

  }

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(){
    this.isSubmitting$ = this.store.pipe(
      select(isSubmittingSelector)
    )

    this.backendErrors$ = this.store.pipe(
      select(validationErrorsSelector)
    )
  }

  initializeForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    let loginData = {
      user: this.form.value
    }
    this.store.dispatch(loginAction({request: loginData}))

    console.log('form', this.form.value)
  }
}
