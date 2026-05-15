export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};


export type Product = {
    id: number
    image: string
    flags: string[]
    title: string
    info: string[]
    nbrAvis: number
    oldPrice?: number
    price: number
    currency: string
}