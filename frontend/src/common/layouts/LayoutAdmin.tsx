import Navbar from "@/common/components/Navbar";
import Sidebar from "@/common/components/Sidebar";
import { ReactNode } from "react";

interface LayoutAdminProps {
  children: ReactNode;
}

const LayoutAdmin = ({ children }: LayoutAdminProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Thanh điều hướng trên cùng */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar bên trái chiếm 25% */}
        <aside className="w-1/4 bg-gray-200 p-4">
          <Sidebar />
        </aside>

        {/* Nội dung chính bên phải chiếm 75% */}
        <main className="w-3/4 p-6">{children}</main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
