import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register.action";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class RegisterEffect {

	// фактически код ниже всегда будет таким, как шаболн можно его использовать
	register$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(registerAction),						// тут фильтруем стрим что бы получить именно нужный нам экшен
			switchMap(({request}) => {				// тут оборачиваю в фигурные скобки - деструктуризация, получаем данные из экшена
				return this.authService.register(request).pipe(
					map((currentUser: CurrentUserInterface) => {
						return registerSuccessAction({currentUser})			// возврат данных в случае успеха
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(registerFailureAction({errors: errorResponse.error.errors}))
					})
				)
			})
		)
	})

	constructor(
		private actions$: Actions, 					// в этом стриме валятся все экшены
		private authService: AuthService
		) {}
}