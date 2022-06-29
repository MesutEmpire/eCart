export interface UserSignUp {
    firstname: string,
    lastname: string,
    phoneNumber: number | null,
    email:string,
    password: string,
    confirmPassword: string,
}
export interface IUsers{
    email: string
    firstname: string
    id: string
    lastname: string
    password: string
    phoneNumber: number |string
}