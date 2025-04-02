"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { ProductsService } from "@/modules/products/services/products.service";
import { Product } from "@/modules/products/types/products.types";
import { useRouter } from "next/navigation";

interface DetailProductProps {
    slug: string;
}

const DetailProduct: React.FC<DetailProductProps> = ({ slug }) => {
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    // ✅ Lấy dữ liệu sản phẩm theo `slug`
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log("📌 Đang tải sản phẩm với slug:", slug);
                const data = await ProductsService.getBySlug(slug);
                setProduct(data);
                console.log("✅ Dữ liệu sản phẩm:", data);
            } catch (error) {
                console.error("❌ Lỗi khi tải chi tiết sản phẩm:", error);
                alert("Không tìm thấy sản phẩm!");
                router.push("/admin/products"); // 🔄 Quay về danh sách sản phẩm
            } finally {
                setLoading(false);
            }
        };
        if (slug) {
            fetchProduct();
        }
    }, [slug, router]);

    if (loading)
        return <p className="text-center text-gray-500">⏳ Đang tải dữ liệu...</p>;
    if (!product)
        return <p className="text-center text-red-500">❌ Không tìm thấy sản phẩm!</p>;

    return (
        <Container className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <Row>
                {/* Ảnh bên trái */}
                <Col md={5}>
                    {product.imageUrls?.length > 0 ? (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.imageUrls[0]}`}
                            alt={product.name}
                            fluid
                            className="rounded-md shadow"
                        />
                    ) : (
                        <p className="text-gray-500">📌 Chưa có ảnh sản phẩm.</p>
                    )}
                </Col>

                {/* Thông tin bên phải */}
                <Col md={7}>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <div className="space-y-3 text-gray-700">
                        <p>
                            <strong>📝 Mô tả:</strong> {product.description || "Không có mô tả"}
                        </p>
                        <p>
                            <strong>🏷️ Danh mục:</strong> {product.category.main} - {product.category.sub}
                        </p>
                        <p>
                            <strong>🔖 Tags:</strong> {product.category.tags?.join(", ") || "Không có"}
                        </p>
                        <p>
                            <strong>💰 Giá vốn:</strong> {product.costPrice.toLocaleString()} VNĐ
                        </p>
                        <p>
                            <strong>💲 Giá gốc:</strong> {product.originalPrice.toLocaleString()} VNĐ
                        </p>
                        <p>
                            <strong>🔥 Giá hiện tại:</strong> {product.currentPrice.toLocaleString()} VNĐ
                        </p>
                        <p>
                            <strong>⭐ Đánh giá:</strong> {product.rating?.average ?? "Chưa có"} ⭐ ({product.rating?.totalReviews ?? 0} đánh giá)
                        </p>
                        <p>
                            <strong>🛒 Đã bán:</strong> {product.totalSold ?? 0} sản phẩm
                        </p>
                    </div>
                </Col>
            </Row>

            {/* 📸 Album ảnh */}
            {product.gallery?.length ? (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">📸 Album ảnh</h2>
                    <Row className="g-2">
                        {product.gallery.map((url, index) => (
                            <Col key={index} md={4}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${url}`}
                                    alt={`Hình ${index + 1}`}
                                    fluid
                                    className="rounded-md shadow-md"
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : (
                <p className="text-gray-500 mt-4">📌 Không có hình ảnh nào.</p>
            )}

            {/* 🔙 Nút quay lại */}
            <Button
                onClick={() => router.push("/client/products")}
                variant="secondary"
                className="mt-6 px-4 py-2">
                ⬅ Quay lại
            </Button>
        </Container>
    );
};

export default DetailProduct;
