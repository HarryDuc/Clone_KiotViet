export type User = {
    _id: string;
    username: string;
    password: string;
    fullName: string;
    role: string;   
    email: string;
    phone: string;

    createdAt?: string;
    updatedAt?: string;
};

export type RegisterUserDto = Omit<User, "_id" | "createdAt" | "updatedAt">;