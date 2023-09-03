import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { PersistantService } from 'src/app/shared/services/persistant.servise';
import { FeedService } from "../../services/feed.service";
import { getFeedAction, getFeedFailureAction, getFeedSuccessAction } from "../actions/getFeed.action";
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface";

@Injectable()
export class GetFeedEffect {
  
  constructor(
    private actions$: Actions,
    private feedService: FeedService,
    private persistantService: PersistantService
  ){}

  // фактически код ниже всегда будет таким, как шаболн можно его использовать
	getFeed$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(getFeedAction),															// тут фильтруем стрим что бы получить именно нужный нам экшен
			switchMap(({url}) => {
        const token  = this.persistantService.get('accesstoken')    // проверяем есть ли токен в loclStrg, и если нет запрос юзера не выполняем
        if(!token) {
          return of(getFeedFailureAction())
        }
				return this.feedService.getFeed(url).pipe(
					map((feed: GetFeedResponseInterface) => {
						return getFeedSuccessAction({feed})			// возврат данных в случае успеха
					}),
					catchError(() => {
						return of(getFeedFailureAction())
					})
				)
			})
		)
	})

}