"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { ProductsService } from "../services/product.service";
import { Product } from "../types/product.type";
import { useRouter } from "next/navigation";

interface DetailProductProps {
    productId: string;
}

const DetailProduct: React.FC<DetailProductProps> = ({ productId }) => {
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log("📌 Đang tải sản phẩm với id:", productId);
                const data = await ProductsService.getById(productId);
                setProduct(data);
                console.log("✅ Dữ liệu sản phẩm:", data);
            } catch (error) {
                console.error("❌ Lỗi khi tải chi tiết sản phẩm:", error);
                alert("Không tìm thấy sản phẩm!");
                router.push("/admin/products");
            } finally {
                setLoading(false);
            }
        };
        if (productId) {
            fetchProduct();
        }
    }, [productId, router]);

    if (loading)
        return <p className="text-center text-gray-500">⏳ Đang tải dữ liệu...</p>;
    if (!product)
        return <p className="text-center text-red-500">❌ Không tìm thấy sản phẩm!</p>;

    return (
        <Container className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <Row>
                <Col md={5}>
                    {product.image?.length > 0 ? (
                        <Image
                            src={`${product.image}`}
                            alt={product.name}
                            fluid
                            className="rounded-md shadow"
                        />
                    ) : (
                        <p className="text-gray-500">📌 Chưa có ảnh sản phẩm.</p>
                    )}
                </Col>

                <Col md={7}>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <div className="space-y-3 text-gray-700">
                        <p>
                            <strong>📝 Mô tả:</strong> {product.description || "Không có mô tả"}
                        </p>
                        <p>
                            <strong>🔖 Vi tri:</strong> {product.location}
                        </p>
                        <p>
                            <strong>💰 Giá vốn:</strong> {product.cost?.toLocaleString()} VNĐ
                        </p>
                        <p>
                            <strong>💲 Giá bán:</strong> {product.price?.toLocaleString()} VNĐ
                        </p>
                    </div>
                </Col>
            </Row>

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
