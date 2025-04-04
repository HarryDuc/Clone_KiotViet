"use client";

import React from "react";

export default function RegisterPage() {

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      alert("Đăng xuất thành công!");
    } catch (error) {
      alert("Đăng xuất thất bại!");
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}
