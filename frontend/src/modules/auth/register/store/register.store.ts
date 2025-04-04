import { create } from "zustand";
import { UsersService } from "../services/user.service";
import { RegisterUserDto, User } from "../types/user.type";

interface RegisterState {
    users: User[];
    addUser: (user: RegisterUserDto, files: File[]) => Promise<void>;
}

export const useProductsStore = create<RegisterState>((set) => ({
    users: [],

    addUser: async (user) => {
        try {
            const createdUser = await UsersService.create(user);
            set((state) => ({ users: [...state.users, createdUser] }));
        } catch (error) {
            console.error("❌ Lỗi khi thêm tài khoản:", error);
        }
    },

}));
