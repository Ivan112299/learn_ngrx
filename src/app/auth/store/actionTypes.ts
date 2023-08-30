export enum ActionTypes {               // enum лучше использовать т.к. внутри нельзя задублировать случайно элемент (В отличчи от const)
    REGISTER = '[Auth] Register',
    REGISTER_SUCCESS = '[Auth] Register success',
    REGISTER_FAILURE = '[Auth] Register failure',
}