"use client";

import { useEffect } from "react";
import { useInteriorsStore } from "../store/interiors.store";
import { InteriorsService } from "../services/interiors.service";
import { useRouter } from "next/navigation";
import { InteriorProject } from "../types/interiors.types"; // Import type
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Alert,
} from "react-bootstrap";

const ListProjects = () => {
  const { projects, fetchProjects } = useInteriorsStore();
  const router = useRouter();

  useEffect(() => {
    console.log("🚀 Fetching projects...");
    fetchProjects().catch((err) =>
      console.error("❌ Lỗi khi lấy dữ liệu:", err)
    );
  }, []);

  // ✅ Debugging: Kiểm tra dữ liệu trả về
  useEffect(() => {
    console.log("✅ Dữ liệu đã tải:", projects);
    if (projects.length > 0) {
      console.log("🔎 Kiểm tra project[0]:", projects[0]);
    }
  }, [projects]);

  return (
    <Container className="mt-4">
      <h2 className="text-primary mb-4">📌 Danh sách Dự án Nội thất</h2>

      {/* 🛠️ Nút thêm dự án */}
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => router.push("/admin/interiors/create")}>
        ➕ Thêm Dự Án
      </Button>

      {/* 📦 Danh sách dự án */}
      <Row>
        {projects.length > 0 ? (
          projects.map((project: InteriorProject) => (
            <Col key={project._id} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm border-0 h-100 d-flex flex-column">
                {/* 🖼️ Ảnh đại diện (Cố định kích thước, không méo) */}
                <div
                  style={{
                    height: "200px",
                    overflow: "hidden",
                  }}>
                  <Card.Img
                    variant="top"
                    src={project.thumbnail || "/default-thumbnail.jpg"}
                    alt={project.title || "Dự án nội thất"}
                    className="object-fit-contain"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>

                <Card.Body className="d-flex flex-column">
                  {/* 📝 Thông tin dự án */}
                  <Card.Title className="text-truncate">
                    {project.title || "Không có tiêu đề"}
                  </Card.Title>
                  <Card.Text className="text-muted" style={{ flexGrow: 1 }}>
                    {project.description || "Chưa có mô tả"}
                  </Card.Text>

                  <small className="text-muted">
                    🏷️ <strong>Danh mục:</strong>{" "}
                    {project.category || "Không xác định"} <br />
                    📏 <strong>Diện tích:</strong>{" "}
                    {project.area || "Chưa cập nhật"} m² <br />
                    📍 <strong>Địa chỉ:</strong>{" "}
                    {project.address || "Chưa có địa chỉ"}
                  </small>

                  {/* 📸 Album ảnh (Hiển thị toàn bộ ảnh, không bị cắt) */}
                  {project.gallery && project.gallery.length > 0 && (
                    <div className="mt-3">
                      <strong>📸 Album ảnh:</strong>
                      <Row className="mt-2 g-2">
                        {project.gallery.slice(0, 3).map((url, index) => (
                          <Col key={index} xs={4}>
                            <Image
                              src={url}
                              alt={`Hình ${index + 1}`}
                              thumbnail
                              fluid
                              style={{
                                width: "100%",
                                height: "60px",
                                objectFit: "contain", // 🔥 Hiển thị toàn bộ ảnh, không cắt
                                backgroundColor: "#f8f9fa", // Màu nền giúp ảnh trông đẹp hơn nếu có viền trắng
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
                        project.slug
                          ? router.push(`/client/interiors/${project.slug}`)
                          : alert("❌ Không tìm thấy slug để xem chi tiết!")
                      }>
                      🔍 Xem
                    </Button>

                    <Button
                      variant="warning"
                      onClick={() =>
                        project._id
                          ? router.push(`/admin/interiors/${project._id}`)
                          : alert("❌ Không tìm thấy ID để chỉnh sửa!")
                      }>
                      ✏️ Sửa
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => {
                        if (
                          project._id &&
                          confirm("❗ Bạn có chắc muốn xóa dự án này không?")
                        ) {
                          InteriorsService.delete(project._id)
                            .then(() => {
                              alert("✅ Dự án đã bị xóa!");
                              fetchProjects();
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
            <Alert variant="warning">🚫 Không có dự án nào.</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ListProjects;
