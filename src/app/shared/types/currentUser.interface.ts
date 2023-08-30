export interface CurrentUserInterface {
    email: string,
    password: string,
    username: string,
    bio: string | null,
    token: string,
    image: string,
    following: boolean
}