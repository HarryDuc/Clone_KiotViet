import { Suspense } from "react";
import DetailProduct from "@/modules/products/pages/DetailProduct";

export default async function Page({ params }: { params: { productId: string } }) {
    await new Promise((resolve) => setTimeout(resolve, 0)); // ✅ Chờ `params` để tránh lỗi Next.js

    console.log("📌 `productId` từ params:", params.productId); // ✅ Debug _id

    if (!params?.productId) {
        return (
            <div className="container mx-auto p-6 text-center">
                <p className="text-red-500 text-lg">❌ Không tìm thấy sản phẩm hợp lệ.</p>
            </div>
        );
    }

    return (
        <Suspense fallback={<p className="text-center text-gray-500">⏳ Đang tải dữ liệu...</p>}>
            <div className="container mx-auto p-6">
                <DetailProduct productId={params.productId} />
            </div>
        </Suspense>
    );
}
