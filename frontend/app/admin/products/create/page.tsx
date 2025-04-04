import CreateProduct from "@/modules/products/pages/CreateProduct";
import { Suspense } from "react";

export default function CreateProductPage() {
    return (
        <Suspense fallback={<p className="text-center text-gray-500">⏳ Đang tải dữ liệu...</p>}>
            <CreateProduct />
        </Suspense>
    );
}
