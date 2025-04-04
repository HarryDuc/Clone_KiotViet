"use client";

import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Image, Button, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { ProductsService } from "../services/product.service";
import { UpdateProductDto } from "../types/product.type";

interface EditProductProps {
    id: string;
}

const EditProduct = ({ id }: EditProductProps) => {
    const router = useRouter();
    const [product, setProduct] = useState<UpdateProductDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [gallery, setGallery] = useState<File[]>([]);
    const [removedImages, setRemovedImages] = useState<string[]>([]);

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

    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setThumbnail(event.target.files[0]);
        }
    };

    const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setGallery(Array.from(event.target.files));
        }
    };


    const handleUpdate = async () => {
        if (!product) return;

        try {
            setUploading(true);
            const updatedProduct: UpdateProductDto = { ...product };

            const formData = new FormData();
            formData.append("name", updatedProduct.name || "");
            formData.append("description", updatedProduct.description || "");
            formData.append("category", updatedProduct.category || "");
            formData.append("cost", updatedProduct.cost?.toString() || "");
            formData.append("price", updatedProduct.price?.toString() || "");
            formData.append("image", updatedProduct.image as string);


            await ProductsService.update(id, formData as any);
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
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Danh mục</Form.Label>
                            <Form.Control
                                type="text"
                                value={product.category || ""}
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        category: e.target.value,
                                    })
                                }
                                
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ảnh đại diện</Form.Label>
                            <Form.Control type="text" value={product.image} onChange={handleThumbnailChange} accept="image/*" />
                            {product.image && product.image.length > 0 && (
                                <Image src={`${product.image}`} alt="Ảnh đại diện" fluid rounded className="mt-2" />
                            )}
                        </Form.Group>
                    </Col>
                </Row>

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
