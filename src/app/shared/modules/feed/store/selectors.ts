import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/appState.interface";
import { FeedStateInterface } from "../types/feedState.interface";


export const feedFeatureSelector = createFeatureSelector<AppStateInterface, FeedStateInterface>('feed')

export const isLoadingSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.isLoading
)

export const errorSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.error
)

export const dataSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.data
)