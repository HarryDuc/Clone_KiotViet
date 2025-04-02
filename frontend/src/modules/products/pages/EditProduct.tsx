"use client";

import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Image, Button, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { ProductsService } from "../services/products.service";
import { UpdateProductDto } from "../types/products.types";

interface EditProductProps {
    id: string;
}

const EditProduct = ({ id }: EditProductProps) => {
    const router = useRouter();
    const [product, setProduct] = useState<UpdateProductDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // 🖼️ Ảnh sản phẩm
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [gallery, setGallery] = useState<File[]>([]);
    const [removedImages, setRemovedImages] = useState<string[]>([]);

    // ✅ Lấy dữ liệu sản phẩm theo ID
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log("📌 Đang tải sản phẩm với ID:", id);
                const data = await ProductsService.getById(id);
                setProduct(data);
                console.log("✅ Dữ liệu sản phẩm:", data);
            } catch (error) {
                console.error("❌ Lỗi khi tải sản phẩm:", error);
                alert("Không tìm thấy sản phẩm!");
                router.push("/admin/products");
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchProduct();
        }
    }, [id, router]);

    // ✅ Xử lý chọn ảnh đại diện mới
    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setThumbnail(event.target.files[0]);
        }
    };

    // ✅ Xử lý chọn album ảnh mới
    const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setGallery(Array.from(event.target.files));
        }
    };

    // ✅ Xóa ảnh khỏi album
    const handleRemoveImage = (imageUrl: string) => {
        setRemovedImages((prev) => [...prev, imageUrl]); // Đánh dấu ảnh cần xóa
    };

    // ✅ Xử lý cập nhật sản phẩm
    const handleUpdate = async () => {
        if (!product) return;

        try {
            setUploading(true);
            const updatedProduct: UpdateProductDto = { ...product };

            const formData = new FormData();
            formData.append("name", updatedProduct.name);
            formData.append("description", updatedProduct.description);
            formData.append("category", JSON.stringify(updatedProduct.category));
            formData.append("costPrice", updatedProduct.costPrice.toString());
            formData.append("originalPrice", updatedProduct.originalPrice.toString());
            formData.append("currentPrice", updatedProduct.currentPrice.toString());

            // ✅ Nếu có ảnh đại diện mới, thêm vào formData
            if (thumbnail) {
                formData.append("thumbnail", thumbnail);
            }

            // ✅ Nếu có ảnh mới cho album, thêm vào formData
            gallery.forEach((file) => {
                formData.append("gallery", file);
            });

            // ✅ Nếu có ảnh bị xóa, gửi danh sách ảnh cần xóa
            if (removedImages.length > 0) {
                formData.append("removedImages", JSON.stringify(removedImages));
            }

            // ✅ Gửi dữ liệu cập nhật lên backend
            await ProductsService.update(id, formData);
            alert("✅ Cập nhật sản phẩm thành công!");
            router.push("/admin/products");
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật:", error);
            alert("❌ Cập nhật thất bại, vui lòng thử lại!");
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <p className="text-center text-gray-500">⏳ Đang tải dữ liệu...</p>;
    if (!product) return <p className="text-center text-red-500">❌ Không tìm thấy sản phẩm!</p>;

    return (
        <Container className="bg-white p-4 shadow-lg rounded-lg">
            <h2 className="mb-4">✏️ Chỉnh sửa Sản Phẩm</h2>
            <Form>
                <Row>
                    {/* 📝 Nhập tên sản phẩm */}
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                value={product.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Col>

                    {/* 📝 Nhập mô tả sản phẩm */}
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    {/* 🏷️ Nhập danh mục */}
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Danh mục</Form.Label>
                            <Form.Control
                                type="text"
                                value={product.category.main}
                                onChange={(e) => setProduct({ ...product, category: { ...product.category, main: e.target.value } })}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* 🖼️ Upload ảnh */}
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ảnh đại diện</Form.Label>
                            <Form.Control type="file" onChange={handleThumbnailChange} accept="image/*" />
                            {product.imageUrls?.length > 0 && (
                                <Image src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.imageUrls[0]}`} alt="Ảnh đại diện" fluid rounded className="mt-2" />
                            )}
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Album ảnh</Form.Label>
                            <Form.Control type="file" multiple onChange={handleGalleryChange} accept="image/*" />
                            {product.gallery?.length > 0 && (
                                <Row className="mt-3">
                                    {product.gallery.map((url, index) => (
                                        <Col key={index} xs={3}>
                                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${url}`} alt={`Hình ${index + 1}`} fluid rounded />
                                            <Button variant="danger" size="sm" onClick={() => handleRemoveImage(url)} className="mt-2">Xóa</Button>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                {/* 📌 Nút cập nhật & Quay lại */}
                <Row className="mt-3">
                    <Col md={6}>
                        <Button onClick={handleUpdate} disabled={uploading} variant="primary" className="w-100">
                            {uploading ? <Spinner animation="border" size="sm" /> : "Lưu thay đổi"}
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Button onClick={() => router.push("/admin/products")} variant="secondary" className="w-100">
                            ⬅ Quay lại
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default EditProduct;
