// src/modules/interiors/layouts/InteriorLayout.tsx

"use client";

import React from "react";
import Sidebar from "@/common/components/Sidebar";
import { useRouter } from "next/navigation";

type InteriorLayoutProps = {
  children: React.ReactNode;
};

export const InteriorLayout: React.FC<InteriorLayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex h-screen">
      {/* Menu dọc bên trái */}
      <div className="w-1/4 bg-gray-100 p-4 border-r">
        <Sidebar />
      </div>

      {/* Nội dung chính bên phải */}
      <div className="w-3/4 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">🏠 Quản lý Dự án Nội thất</h1>
        {children}
      </div>
    </div>
  );
};
