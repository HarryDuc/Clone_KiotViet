// src/app/products/page.tsx
import axiosClient from "../../../utils/axiosClient";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   brand?: {
//     _id: string;
//     name: string;
//   };
//   category?: {
//     _id: string;
//     name: string;
//   };
// }

async function fetchProducts(): Promise<any[]> {
  const res = await axiosClient.get("/products");
  return res.data;
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  if (!products) {
    return <div>Không có dữ liệu sản phẩm</div>;
  }

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.length === 0 ? (
          <li>Không có sản phẩm nào</li>
        ) : (
          products.map((product: any) => (
            <li key={product._id}>
              {product.name} - {product.price} VNĐ
              {product.brand && ` - Thương hiệu: ${product.brand.name}`}
              {product.category && ` - Danh mục: ${product.category.name}`}
              {product.lacation && ` - Vị trí: ${product.lacation.name}`}
              {product.status && ` - Trạng thái: ${product.status}`}
              <div>
                <h3>Hình ảnh sản phẩm:</h3>
                <img src={product.image} alt="Hình ảnh sản phẩm" width="200" />
              </div>
              {product.description && ` - Mô tả: ${product.description}`}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
