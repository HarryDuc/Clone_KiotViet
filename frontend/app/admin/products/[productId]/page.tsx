import  EditProduct  from "@/modules/products/pages/EditProduct";
import { Suspense } from "react";
export default function EditProductPage({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProduct id={params.productId} />
      </Suspense>
    </div>
  );
}
