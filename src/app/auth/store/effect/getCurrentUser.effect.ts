import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { PersistantService } from 'src/app/shared/services/persistant.servise';
import { HttpErrorResponse } from '@angular/common/http';
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from '../actions/getUser.action';

@Injectable()
export class GetCurrentUserEffect {
  
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistantService: PersistantService
  ){}

  // фактически код ниже всегда будет таким, как шаболн можно его использовать
	getCurrentUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(getCurrentUserAction),															// тут фильтруем стрим что бы получить именно нужный нам экшен
			switchMap(() => {
        const token  = this.persistantService.get('accesstoken')    // проверяем есть ли токен в loclStrg, и если нет запрос юзера не выполняем
        if(!token) {
          return of(getCurrentUserFailureAction())
        }
				return this.authService.getCurrentUser().pipe(
					map((currentUser: CurrentUserInterface) => {
						return getCurrentUserSuccessAction({currentUser})			// возврат данных в случае успеха
					}),
					catchError(() => {
						return of(getCurrentUserFailureAction())
					})
				)
			})
		)
	})

}