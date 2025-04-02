"use client"; // ✅ Cần thiết vì sử dụng `useEffect`, `useState`, `useRouter`

import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { InteriorsService } from "@/modules/interiors/services/interiors.service";
import { InteriorProject } from "@/modules/interiors/types/interiors.types";
import { useRouter } from "next/navigation";

interface DetailProjectProps {
  slug: string;
}

const DetailProject: React.FC<DetailProjectProps> = ({ slug }) => {
  const router = useRouter();
  const [project, setProject] = useState<InteriorProject | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Lấy dữ liệu dự án theo `slug`
  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log("📌 Đang tải dự án với slug:", slug);
        const data = await InteriorsService.getBySlug(slug);
        setProject(data);
        console.log("✅ Dữ liệu dự án:", data);
      } catch (error) {
        console.error("❌ Lỗi khi tải chi tiết dự án:", error);
        alert("Không tìm thấy dự án!");
        router.push("/admin/interiors"); // 🔄 Quay về danh sách dự án
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchProject();
    }
  }, [slug, router]);

  if (loading)
    return <p className="text-center text-gray-500">⏳ Đang tải dữ liệu...</p>;
  if (!project)
    return <p className="text-center text-red-500">❌ Không tìm thấy dự án!</p>;

  return (
    <Container className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Row>
        {/* Ảnh bên trái */}
        <Col md={4}>
          {project.thumbnail && (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fluid
              style={{ height: "100%", objectFit: "cover" }}
              className="rounded-md shadow"
            />
          )}
        </Col>
        {/* Thông tin bên phải */}
        <Col md={8}>
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>📝 Mô tả:</strong> {project.description}
            </p>
            <p>
              <strong>📏 Diện tích:</strong> {project.area ?? "Chưa cập nhật"}{" "}
              m²
            </p>
            <p>
              <strong>👤 Khách hàng:</strong> {project.customer}
            </p>
            <p>
              <strong>📍 Địa chỉ:</strong> {project.address}
            </p>
            <p>
              <strong>📅 Ngày hoàn thành:</strong> {project.completedDate}
            </p>
            <p>
              <strong>🏷️ Danh mục:</strong> {project.category}
            </p>
            <p>
              <strong>🏗️ Loại hình:</strong>{" "}
              {project.type?.join(", ") ?? "Không xác định"}
            </p>
          </div>
        </Col>
      </Row>

      {/* 📸 Album ảnh */}
      {project.gallery?.length ? (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">📸 Album ảnh</h2>
          <Row className="g-2">
            {project.gallery.map((url, index) => (
              <Col key={index} md={4}>
                <Image
                  src={url}
                  alt={`Hình ${index + 1}`}
                  fluid
                  style={{ height: "8rem", objectFit: "cover" }}
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
        onClick={() => router.push("/client/interiors")}
        variant="secondary"
        className="mt-6 px-4 py-2">
        ⬅ Quay lại
      </Button>
    </Container>
  );
};

export default DetailProject;
