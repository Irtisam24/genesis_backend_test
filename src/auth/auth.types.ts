export interface ILoginPaylaod {
    email: string,
    userId: number
}
export type TValidatePayload = Omit<ILoginPaylaod, "userId"> & {
    sub: string
} 