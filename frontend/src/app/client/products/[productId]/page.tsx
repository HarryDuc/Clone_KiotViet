// src/app/client/products/details/page.tsx
import axiosClient from "@/config/axiosClient";

async function fetchProduct(productId: string): Promise<any> {
  try {
    const res = await axiosClient.get(`/products/${productId}`);
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.error("Error fetching product:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch product");
  }
}

export default async function ProductDetailsPage({ params }: { params: { productId: string } }) {
  try {
    const product = await fetchProduct(params.productId);

    if (!product) {
      return <div>Không có dữ liệu sản phẩm</div>;
    }

    return (
      <div>
        <h1>Chi tiết sản phẩm</h1>
        <div>
          <h2>{product.name}</h2>
          <p>Giá: {product.price} VNĐ</p>
          {product.brand && <p>Thương hiệu: {product.brand.name}</p>}
          {product.category && <p>Danh mục: {product.category.name}</p>}
          {product.location && <p>Vị trí: {product.location}</p>}
          {product.status && <p>Trạng thái: {product.status}</p>}
          <div>
            <h3>Hình ảnh sản phẩm:</h3>
            {product.image && (
              <img src={product.image} alt="Hình ảnh sản phẩm" width="200" />
            )}
          </div>
          {product.description && <p>Mô tả: {product.description}</p>}
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div>
        <h1>Lỗi khi tải dữ liệu</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}