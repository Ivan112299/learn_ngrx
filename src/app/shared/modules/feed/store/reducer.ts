import { Action, createReducer, on } from "@ngrx/store";
import { FeedStateInterface } from "../types/feedState.interface";
import { getFeedAction, getFeedFailureAction, getFeedSuccessAction } from "./actions/getFeed.action";
import { routerNavigatedAction } from "@ngrx/router-store";

const initialState: FeedStateInterface = {
  isLoading: false, 
  error: null, 
  data: null
}

const feedReduser = createReducer(
  initialState,
  on(
    getFeedAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getFeedSuccessAction,
    (state, action): FeedStateInterface => ({
      ...state,
      isLoading: false,
      data: action.feed
    })
  ),
  on(
    getFeedFailureAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
  on(                                     // этот on очищает данные при смене роута
    routerNavigatedAction,
    (): FeedStateInterface => ({
      ...initialState
    })
  )
)

export function reducers(state: FeedStateInterface, action: Action) {
  return feedReduser(state, action)
}