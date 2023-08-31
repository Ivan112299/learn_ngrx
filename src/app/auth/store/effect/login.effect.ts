import { loginAction, loginFailureAction, loginSuccessAction } from './../actions/login.action';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { PersistantService } from 'src/app/shared/services/persistant.servise';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffect {
  
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistantService: PersistantService,
    private router: Router
  ){}

  // фактически код ниже всегда будет таким, как шаболн можно его использовать
	login$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(loginAction),															// тут фильтруем стрим что бы получить именно нужный нам экшен
			switchMap(({request}) => {													// тут оборачиваю в фигурные скобки - деструктуризация, получаем данные из экшена
				return this.authService.login(request).pipe(
					map((currentUser: CurrentUserInterface) => {
						this.persistantService.set('accesstoken', currentUser.token)
						return loginSuccessAction({currentUser})			// возврат данных в случае успеха
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(loginFailureAction({errors: errorResponse.error.errors}))
					})
				)
			})
		)
	})

  redirectAfterSubmit$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(loginSuccessAction),
			tap(() => {
				this.router.navigateByUrl('/')
			})
		)
	},
	{
		dispatch: false			// каждый эффект должен диспатчить событие, возвращать экшен, 
												//этот параметр позволяет скаазть что тут этого диспатча не будет
	})


}