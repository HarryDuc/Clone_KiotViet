"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Button, Spinner, Card, Row, Col, Image } from "react-bootstrap";
import { uploadImagesToImgBB } from "@/common/utils/uploadService";
import { InteriorsService } from "../services/interiors.service";
import { CreateInteriorProjectDto } from "../types/interiors.types";

const CreateProject = () => {
  const router = useRouter();

  // 📝 State quản lý thông tin dự án
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<
    "CAFE_NHA_HANG" | "CAN_HO_BIET_THU" | "SHOP_SHOWROOM" | "VAN_PHONG"
  >("VAN_PHONG");
  const [type, setType] = useState<Array<"THIET_KE" | "THI_CONG">>([]);
  const [area, setArea] = useState("");
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [completedDate, setCompletedDate] = useState("");

  // 🖼️ Hình ảnh
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (thumbnail) {
      const previewUrl = URL.createObjectURL(thumbnail);
      setThumbnailPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [thumbnail]);

  useEffect(() => {
    const previews = gallery.map((file) => URL.createObjectURL(file));
    setGalleryPreviews(previews);
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [gallery]);

  // ✅ Xử lý chọn ảnh đại diện
  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setThumbnail(event.target.files[0]);
    }
  };

  // ✅ Xử lý chọn album ảnh
  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setGallery(Array.from(event.target.files));
    }
  };

  // ✅ Xử lý tạo dự án
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !title.trim() ||
      !area.trim() ||
      !customer.trim() ||
      !address.trim() ||
      !completedDate.trim()
    ) {
      alert("❌ Vui lòng nhập đầy đủ thông tin hợp lệ!");
      return;
    }

    setLoading(true);

    try {
      // 🔄 Upload ảnh lên ImgBB
      const imageUrls: string[] = [];

      if (thumbnail) {
        const uploadedThumbnail = await uploadImagesToImgBB([thumbnail]);
        imageUrls.push(...uploadedThumbnail);
      }

      if (gallery.length > 0) {
        const uploadedGallery = await uploadImagesToImgBB(gallery);
        imageUrls.push(...uploadedGallery);
      }

      if (imageUrls.length === 0) {
        alert("❌ Lỗi tải ảnh lên, vui lòng thử lại!");
        setLoading(false);
        return;
      }

      // 📦 Chuẩn bị dữ liệu gửi lên backend
      const projectData: CreateInteriorProjectDto = {
        title,
        category,
        type,
        area,
        customer,
        address,
        completedDate,
        thumbnail: imageUrls[0], // ✅ Ảnh đầu tiên làm ảnh đại diện
        gallery: imageUrls.slice(1), // ✅ Các ảnh còn lại làm gallery
      };

      console.log("📦 Dữ liệu gửi lên:", JSON.stringify(projectData, null, 2));

      // 🚀 Gửi dữ liệu lên backend
      await InteriorsService.create(projectData, [thumbnail, ...gallery]);

      alert("✅ Dự án đã được tạo thành công!");
      router.push("/admin/interiors");
    } catch (error) {
      console.error("❌ Lỗi khi tạo dự án:", error);
      alert("❌ Đã xảy ra lỗi, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 border-0">
      <Card.Body>
        <Row className="justify-content-center">
          <Col md={12} className="text-center">
            <h2 className="text-primary mb-4">📌 Thêm Dự Án</h2>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Tên dự án</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Danh mục</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value="CAFE_NHA_HANG">
                    Nội thất Cafe – Nhà hàng
                  </option>
                  <option value="CAN_HO_BIET_THU">
                    Nội thất Căn hộ – Biệt thự
                  </option>
                  <option value="SHOP_SHOWROOM">
                    Nội thất Shop – Showroom
                  </option>
                  <option value="VAN_PHONG">Nội thất Văn phòng</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Loại hình</Form.Label>
                <div>
                  <Form.Check
                    type="checkbox"
                    label="Thiết kế"
                    value="THIET_KE"
                    checked={type.includes("THIET_KE")}
                    onChange={(e) => {
                      setType((prev) =>
                        e.target.checked
                          ? [...prev, "THIET_KE"]
                          : prev.filter((t) => t !== "THIET_KE")
                      );
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Thi công"
                    value="THI_CONG"
                    checked={type.includes("THI_CONG")}
                    onChange={(e) => {
                      setType((prev) =>
                        e.target.checked
                          ? [...prev, "THI_CONG"]
                          : prev.filter((t) => t !== "THI_CONG")
                      );
                    }}
                  />
                </div>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Diện tích (m²)</Form.Label>
                <Form.Control
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Tên khách hàng</Form.Label>
                <Form.Control
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ dự án</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Tháng hoàn thành</Form.Label>
                <Form.Control
                  type="month"
                  value={completedDate}
                  onChange={(e) => setCompletedDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Ảnh đại diện</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleThumbnailChange}
                  accept="image/*"
                />
              </Form.Group>
              {thumbnailPreview && (
                <Image
                  src={thumbnailPreview}
                  alt="Ảnh đại diện"
                  fluid
                  rounded
                  className="mt-2"
                />
              )}
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Album ảnh</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleGalleryChange}
                  accept="image/*"
                />
              </Form.Group>
              {gallery.length > 0 && (
                <Row>
                  {gallery.map((file, index) => (
                    <Col key={index} xs={3} className="text-center">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Ảnh ${index + 1}`}
                        fluid
                        rounded
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>

          <Button
            type="submit"
            variant="primary"
            className="w-100 mt-3"
            disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Lưu Dự Án"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateProject;
