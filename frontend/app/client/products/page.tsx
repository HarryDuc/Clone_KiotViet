import { Suspense } from "react";
import ListProducts from "../../../src/modules/products/pages/ListProducts";

export default async function Page() {
    return <Suspense fallback={<p className="text-center text-gray-500">⏳ Đang tải dữ liệu...</p>}>
        <ListProducts />
    </Suspense>
}
