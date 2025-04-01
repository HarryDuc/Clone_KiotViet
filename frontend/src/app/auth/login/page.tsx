"use client";

import React, { useState } from "react";
import axiosClient from "@/utils/axiosClient";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password
      });
      console.log(response.data);
      alert("Đăng nhap thành công!");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response ? error.response.data : error.message);
      } else {
        console.error("General error:", error);
      }
      alert("Đăng nhap thất bại!");
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Đăng nhap</button>
      </form>
    </div>
  );
}
