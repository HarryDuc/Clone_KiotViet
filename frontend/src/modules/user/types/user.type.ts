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

export type CreateUserDto = Omit<User, "_id" | "createdAt" | "updatedAt">;
export type UpdateUserDto = Partial<Omit<User, "_id" | "createdAt">>;
