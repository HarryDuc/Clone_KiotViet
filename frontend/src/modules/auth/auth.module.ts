import { AuthDTO } from "./dtos/auth.dto";
import AuthGuard from "./guards/AuthGuard";
import { useAuth } from "./repositories/authRepository";
import { attachTokenToHeaders } from "./strategies/token.strategy";

export const AuthModule = {
    DTO: {} as AuthDTO,  // 🟢 Cách sửa: Sử dụng casting `{}` thành `AuthDTO`
    Guard: AuthGuard,
    Repository: useAuth,
    TokenStrategy: attachTokenToHeaders,
};
