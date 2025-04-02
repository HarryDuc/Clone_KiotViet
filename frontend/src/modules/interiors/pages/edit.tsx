"use client"; // ✅ Bắt buộc vì sử dụng `useState`, `useEffect`

import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Image, Button } from "react-bootstrap";
import { useRouter } from "next/navigation"; // ✅ Thay thế `next/router`
import { InteriorsService } from "../services/interiors.service";
import { UpdateInteriorProjectDto } from "../types/interiors.types";
import { uploadImagesToImgBB } from "@/common/utils/uploadService";

interface EditProjectProps {
  id: string;
}

const EditProject = ({ id }: EditProjectProps) => {
  const router = useRouter();
  const [project, setProject] = useState<UpdateInteriorProjectDto | null>(null);
  const [loading, setLoading] = useState(true);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  // ✅ Lấy dữ liệu dự án theo ID
  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log("📌 Đang tải dự án với ID:", id);
        const data = await InteriorsService.getById(id);
        setProject(data);
        console.log("✅ Dữ liệu dự án:", data);
      } catch (error) {
        console.error("❌ Lỗi khi tải dự án:", error);
        alert("Không tìm thấy dự án!");
        router.push("/client/interiors");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProject();
    }
  }, [id, router]);

  // ✅ Xử lý chọn ảnh đại diện mới
  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  // ✅ Xử lý cập nhật dự án
  const handleUpdate = async () => {
    if (!project) return;

    try {
      setLoading(true);
      const updatedProject: UpdateInteriorProjectDto = { ...project };

      // ✅ Nếu có ảnh đại diện mới, tải lên
      if (thumbnail) {
        const uploadedThumbnail = await uploadImagesToImgBB([thumbnail]);
        updatedProject.thumbnail = uploadedThumbnail[0];
      }

      // ✅ Nếu có ảnh mới cho album, tải lên
      if (gallery.length > 0) {
        const uploadedGallery = await uploadImagesToImgBB(gallery);
        updatedProject.gallery = [
          ...(project.gallery || []),
          ...uploadedGallery,
        ];
      }

      // ✅ Nếu có ảnh bị xóa, loại bỏ khỏi gallery
      if (removedImages.length > 0) {
        updatedProject.gallery = (updatedProject.gallery || []).filter(
          (img) => !removedImages.includes(img)
        );
      }

      // ✅ Gửi dữ liệu cập nhật
      await InteriorsService.update(id, updatedProject);
      alert("✅ Cập nhật dự án thành công!");
      router.push("/admin/interiors");
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật:", error);
      alert("❌ Cập nhật thất bại, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">⏳ Đang tải dữ liệu...</p>;
  if (!project)
    return <p className="text-center text-red-500">❌ Không tìm thấy dự án!</p>;

  return (
    <Container className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="mb-4">✏️ Chỉnh sửa Dự Án</h2>
      <Form>
        <Row>
          {/* 📝 Nhập tiêu đề (Full width) */}
          <Col md={3}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Nhập tiêu đề</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={project.title}
                onChange={(e) =>
                  setProject({ ...project, title: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>

          {/* 📌 Nhập mô tả (Full width) */}
          <Col md={3}>
            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Nhập mô tả</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={project.description}
                onChange={(e) =>
                  setProject({ ...project, description: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="area" className="mb-3">
              <Form.Label>Nhập diện tích</Form.Label>
              <Form.Control
                type="text"
                name="area"
                value={project.area ?? ""}
                onChange={(e) =>
                  setProject({ ...project, area: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="customer" className="mb-3">
              <Form.Label>Nhập khách hàng</Form.Label>
              <Form.Control
                type="text"
                name="customer"
                value={project.customer ?? ""}
                onChange={(e) =>
                  setProject({ ...project, customer: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Nhập địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={project.address ?? ""}
                onChange={(e) =>
                  setProject({ ...project, address: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="completedDate" className="mb-3">
              <Form.Label>Ngày hoàn thành</Form.Label>
              <Form.Control
                type="month"
                name="completedDate"
                value={
                  project.completedDate
                    ? project.completedDate.substring(0, 7)
                    : ""
                }
                onChange={(e) =>
                  setProject({ ...project, completedDate: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* 🖼️ Ảnh đại diện hiện tại */}
          <Col md={3}>
            {project.thumbnail && (
              <div>
                <p className="text-sm font-medium">📌 Ảnh đại diện hiện tại:</p>
                <Image
                  src={project.thumbnail}
                  alt="Thumbnail"
                  rounded
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </Col>

          {/* 🖼️ Chọn ảnh đại diện mới & Preview */}
          <Col md={6}>
            <Form.Group controlId="thumbnail">
              <Form.Label>Chọn ảnh đại diện mới</Form.Label>
              <Form.Control
                type="file"
                onChange={handleThumbnailChange}
                accept="image/*"
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            {thumbnail && (
              <div>
                <p className="text-sm font-medium">Ảnh đại diện mới đã chọn:</p>
                <Image
                  src={URL.createObjectURL(thumbnail)}
                  alt="Preview Thumbnail"
                  rounded
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </Col>
        </Row>

        <Row>
          {/* 📸 Album ảnh hiện tại */}
          <Col md={12}>
            {project.gallery && project.gallery.length > 0 && (
              <div>
                <p className="text-sm font-medium">📸 Album ảnh hiện tại:</p>
                <Row>
                  {project.gallery.map((url, index) => (
                    <Col key={index} md={3} className="mb-3">
                      <div style={{ position: "relative" }}>
                        <Image
                          src={url}
                          alt={`Hình ${index + 1}`}
                          rounded
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            padding: "0.25rem 0.5rem",
                          }}
                          onClick={() => handleRemoveImage(url)}>
                          ❌
                        </Button>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>

          {/* 📸 Chọn ảnh mới cho album & Preview */}
          <Col md={12}>
            <div>
              <Form.Group controlId="gallery">
                <Form.Label>Chọn ảnh mới cho album</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleGalleryChange}
                  accept="image/*"
                />
              </Form.Group>
            </div>
          </Col>

          <Col>
            {gallery && gallery.length > 0 && (
              <Col md={12}>
                <p className="text-sm font-medium">
                  Ảnh mới cho album đã chọn:
                </p>
                <Row>
                  {gallery.map((file, index) => (
                    <Col key={index} md={3} className="mb-3">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Preview image ${index + 1}`}
                        rounded
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            )}
          </Col>
        </Row>

        {/* 📌 Nút cập nhật & Quay lại */}
        <Row className="mt-3">
          <Col md={6}>
            <Button
              onClick={handleUpdate}
              disabled={loading}
              variant="primary"
              className="w-100">
              {loading ? "Đang xử lý..." : "Lưu thay đổi"}
            </Button>
          </Col>
          <Col md={6}>
            <Button
              onClick={() => router.push("/admin/interiors")}
              variant="secondary"
              className="w-100">
              ⬅ Quay lại
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EditProject;
