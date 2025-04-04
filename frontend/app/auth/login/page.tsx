
import Login from "@/modules/auth/login/pages/Login";
import { Suspense } from "react";

export default function CreateProductPage() {
    return (
        <Suspense fallback={<p className="text-center text-gray-500">⏳ Đang tải dữ liệu...</p>}>
            <Login />
        </Suspense>
    );
}
