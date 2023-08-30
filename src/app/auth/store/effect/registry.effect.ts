import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register.action";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistantService } from "src/app/shared/services/persistant.servise";
import { Router } from "@angular/router";

@Injectable()
export class RegisterEffect {

	// фактически код ниже всегда будет таким, как шаболн можно его использовать
	register$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(registerAction),															// тут фильтруем стрим что бы получить именно нужный нам экшен
			switchMap(({request}) => {													// тут оборачиваю в фигурные скобки - деструктуризация, получаем данные из экшена
				return this.authService.register(request).pipe(
					map((currentUser: CurrentUserInterface) => {
						// window.localStorage.setItem('accessToken', currentUser.token)			// сохранили токен в локал сторидж, ниже решение через сервис
						this.persistantService.set('accesstoken', currentUser.token)
						return registerSuccessAction({currentUser})			// возврат данных в случае успеха
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(registerFailureAction({errors: errorResponse.error.errors}))
					})
				)
			})
		)
	})

	redirectAfterSubmit$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(registerSuccessAction),
			tap(() => {
				this.router.navigateByUrl('/')
			})
		)
	},
	{
		dispatch: false			// каждый эффект должен диспатчить событие, возвращать экшен, 
												//этот параметр позволяет скаазть что тут этого диспатча не будет
	})

	constructor(
		private actions$: Actions, 					// в этом стриме валятся все экшены
		private authService: AuthService,
		private persistantService: PersistantService,
		private router: Router
		) {}
}