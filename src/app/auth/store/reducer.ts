import { AuthStateInterface } from './../types/authState.interface';
import { Action, createReducer, on } from "@ngrx/store";
import { registerAction, registerFailureAction, registerSuccessAction } from "./actions/register.action";
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.action';
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from './actions/getUser.action';

const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser:  null,
    isLoggedIn: null,
    validationErrors: null,
    isLoading: false
}

const authReducer = createReducer(
    initialState,
    on(
        registerAction, 
        (state): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null
    })),
    on(
        registerSuccessAction, 
        (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        isLoggedIn: true,
        currentUser: action.currentUser
    })),
    on(
        registerFailureAction, 
        (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors
    })),
    on(
        loginAction, 
        (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null
    })),
    on(
        loginSuccessAction, 
        (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        isLoggedIn: true,
        currentUser: action.currentUser
    })),
    on(
        loginFailureAction, 
        (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors
    })),
    on(
        getCurrentUserAction, 
        (state): AuthStateInterface => ({
        ...state,
        isLoading: true
    })),
    on(
        getCurrentUserSuccessAction, 
        (state, action): AuthStateInterface => ({
        ...state,
        currentUser: action.currentUser,
        isLoading: false,
        isLoggedIn: true
    })),
    on(
        getCurrentUserFailureAction, 
        (state): AuthStateInterface => ({
        ...state,
        isLoggedIn: false,
        currentUser: null,
        isLoading: false
    })),
)

export function reducers(state: AuthStateInterface, action: Action) {
    return authReducer(state, action)
}