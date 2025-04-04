"use client";

import { useEffect } from "react";
import { useProductsStore } from "../store/products.store";
import { ProductsService } from "../services/product.service";
import { useRouter } from "next/navigation";
import { Product } from "../types/product.type";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
} from "react-bootstrap";

const ListProducts = () => {
  const { products, fetchProducts, removeProduct } = useProductsStore();
  const router = useRouter();

  useEffect(() => {
    console.log("🚀 Fetching products...");
    fetchProducts().catch((err: any) =>
      console.error("❌ Lỗi khi lấy dữ liệu:", err)
    );
  }, []);


  useEffect(() => {
    console.log("✅ Dữ liệu đã tải:", products);
    if (products.length > 0) {
      console.log("🔎 Kiểm tra product[0]:", products[0]);
    }
  }, [products]);

  return (
    <Container className="mt-4">
      <h2 className="text-primary mb-4">🛍️ Danh sách Sản phẩm</h2>

      <Button
        variant="primary"
        className="mb-3"
        onClick={() => router.push("/admin/products/create")}
      >
        ➕ Thêm Sản phẩm
      </Button>

      <Row>
        {products.length > 0 ? (
          products.map((product: Product) => (
            <Col key={product._id} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm border-0 h-100 d-flex flex-column">
                <div>
                  <Card.Img
                    variant="top"
                    src={Array.isArray(product.image) ? product.image[0] : product.image}
                    alt={product.name || "Sản phẩm"}
                    className="object-fit-contain"
                    style={{
                      width: "300px",
                      height: "200px",
                    }}
                  />
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-truncate">
                    {product.name || "Không có tên"}
                  </Card.Title>
                  <Card.Text className="text-muted" style={{ flexGrow: 1 }}>
                    {product.description || "Chưa có mô tả"}
                  </Card.Text>

                  <small className="text-muted">
                    🏷️ <strong>Danh mục:</strong> {product.category} <br />
                    💰 <strong>Giá:</strong> {product.price} VNĐ <br />
                    💰 <strong>Giá vốn:</strong> {product.cost} VNĐ
                  </small>

                  <div className="mt-3 d-flex justify-content-between">
                    <Button
                      variant="info"
                      onClick={() =>
                        product._id
                          ? router.push(`/client/products/${product._id}`)
                          : alert("❌ Không tìm thấy id để xem chi tiết!")
                      }
                    >
                      🔍 Xem
                    </Button>

                    <Button
                      variant="warning"
                      onClick={() =>
                        product._id
                          ? router.push(`/admin/products/${product._id}`)
                          : alert("❌ Không tìm thấy ID để chỉnh sửa!")
                      }
                    >
                      ✏️ Sửa
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => {
                        if (
                          product._id &&
                          confirm("❗ Bạn có chắc muốn xóa sản phẩm này không?")
                        ) {
                          removeProduct(product._id)
                            .then(() => {
                              alert("✅ Sản phẩm đã bị xóa!");
                              fetchProducts();
                            })
                            .catch((err) => {
                              console.error("❌ Lỗi khi xóa:", err);
                              alert("❌ Xóa thất bại, vui lòng thử lại!");
                            });
                        } else {
                          alert("❌ Không thể xóa vì thiếu ID!");
                        }
                      }}>🗑️ Xóa
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="warning">🚫 Không có sản phẩm nào.</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ListProducts;
