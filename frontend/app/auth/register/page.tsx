import Register from "@/modules/auth/register/pages/Register";
import { Suspense } from "react";

export default function CreateProductPage() {
    return (
        // <Suspense fallback={<p className="text-center text-gray-500">⏳ Đang tải dữ liệu...</p>}>
            <Register />
        // </Suspense>
    );
}
