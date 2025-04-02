"use client";

import { useEffect } from "react";
import { useProductsStore } from "../store/products.store";
import { ProductsService } from "../services/products.service";
import { useRouter } from "next/navigation";
import { Product } from "../types/products.types"; // Import type
import { Container, Row, Col, Card, Button, Image, Alert } from "react-bootstrap";

const ListProducts = () => {
    const { products, fetchProducts } = useProductsStore();
    const router = useRouter();

    useEffect(() => {
        console.log("🚀 Fetching products...");
        fetchProducts().catch((err) => console.error("❌ Lỗi khi lấy dữ liệu:", err));
    }, []);

    // ✅ Debugging: Kiểm tra dữ liệu trả về
    useEffect(() => {
        console.log("✅ Dữ liệu đã tải:", products);
        if (products.length > 0) {
            console.log("🔎 Kiểm tra product[0]:", products[0]);
        }
    }, [products]);

    return (
        <Container className="mt-4">
            <h2 className="text-primary mb-4">🛍️ Danh sách Sản phẩm</h2>

            {/* 🛠️ Nút thêm sản phẩm */}
            <Button variant="primary" className="mb-3" onClick={() => router.push("/admin/products/create")}>
                ➕ Thêm Sản phẩm
            </Button>

            {/* 📦 Danh sách sản phẩm */}
            <Row>
                {products.length > 0 ? (
                    products.map((product: Product) => (
                        <Col key={product._id} md={6} lg={4} className="mb-4">
                            <Card className="shadow-sm border-0 h-100 d-flex flex-column">
                                {/* 🖼️ Ảnh đại diện (Cố định kích thước, không méo) */}
                                <div
                                    style={{
                                        height: "200px",
                                        overflow: "hidden",
                                    }}>
                                    <Card.Img
                                        variant="top"
                                        src={product.imageUrls?.[0] || "/default-thumbnail.jpg"}
                                        alt={product.name || "Sản phẩm"}
                                        className="object-fit-contain"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </div>

                                <Card.Body className="d-flex flex-column">
                                    {/* 📝 Thông tin sản phẩm */}
                                    <Card.Title className="text-truncate">{product.name || "Không có tên"}</Card.Title>
                                    <Card.Text className="text-muted" style={{ flexGrow: 1 }}>
                                        {product.description || "Chưa có mô tả"}
                                    </Card.Text>

                                    <small className="text-muted">
                                        🏷️ <strong>Danh mục:</strong> {product.category.main} - {product.category.sub} <br />
                                        💰 <strong>Giá:</strong> {product.currentPrice.toLocaleString()} VNĐ <br />
                                        ⭐ <strong>Đánh giá:</strong> {product.rating?.average ?? "Chưa có"} ⭐ ({product.rating?.totalReviews ?? 0} đánh giá)
                                    </small>

                                    {/* 📸 Album ảnh */}
                                    {product.gallery && product.gallery.length > 0 && (
                                        <div className="mt-3">
                                            <strong>📸 Album ảnh:</strong>
                                            <Row className="mt-2 g-2">
                                                {product.gallery.slice(0, 3).map((url, index) => (
                                                    <Col key={index} xs={4}>
                                                        <Image
                                                            src={url}
                                                            alt={`Hình ${index + 1}`}
                                                            thumbnail
                                                            fluid
                                                            style={{
                                                                width: "100%",
                                                                height: "60px",
                                                                objectFit: "contain",
                                                                backgroundColor: "#f8f9fa",
                                                            }}
                                                        />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    )}

                                    {/* 🎯 Nút Xem, Sửa & Xóa */}
                                    <div className="mt-3 d-flex justify-content-between">
                                        <Button
                                            variant="info"
                                            onClick={() =>
                                                product.slug
                                                    ? router.push(`/client/products/${product.slug}`)
                                                    : alert("❌ Không tìm thấy slug để xem chi tiết!")
                                            }>
                                            🔍 Xem
                                        </Button>

                                        <Button
                                            variant="warning"
                                            onClick={() =>
                                                product._id
                                                    ? router.push(`/admin/products/${product._id}`)
                                                    : alert("❌ Không tìm thấy ID để chỉnh sửa!")
                                            }>
                                            ✏️ Sửa
                                        </Button>

                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                if (product._id && confirm("❗ Bạn có chắc muốn xóa sản phẩm này không?")) {
                                                    ProductsService.delete(product._id)
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
                                            }}>
                                            🗑️ Xóa
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
