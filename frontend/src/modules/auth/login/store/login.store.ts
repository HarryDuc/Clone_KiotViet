import { create } from "zustand";
import { UsersService } from "../services/user.service";
import { LoginUserDto, User } from "../types/user.type";

interface UsersState {
    users: User[];
    loginUser: (user: LoginUserDto) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set) => ({
    users: [],

    loginUser: async (user: LoginUserDto) => {
        try {
            const updatedUser = await UsersService.login(user);
            set((state) => ({
                users: [...state.users, updatedUser as unknown as User],
            }));
        } catch (error) {
            console.error(`❌ Lỗi khi đăng nhập người dùng:`, error);
        }
    },
}));
