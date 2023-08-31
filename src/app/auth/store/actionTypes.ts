export enum ActionTypes {               // enum лучше использовать т.к. внутри нельзя задублировать случайно элемент (В отличчи от const)
    REGISTER = '[Auth] Register',
    REGISTER_SUCCESS = '[Auth] Register success',
    REGISTER_FAILURE = '[Auth] Register failure',
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login success',
    LOGIN_FAILURE = '[Auth] Login failure',
}