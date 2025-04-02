"use client";

import React, { useState } from "react";
import axiosClient from "@/config/axiosClient";
import axios from "axios";

export default function AddProductPage() {
  const [product, setProduct] = useState({
    productId: "",
    barcode: "",
    name: "",
    category: "",
    brand: "",
    price: "",
    cost: "",
    stock: "",
    location: "",
    minStock: "",
    maxStock: "",
    status: "Cho phép kinh doanh",
    image: "",
    weight: "",
    unit: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosClient.patch(`/products/${product.productId}`, product);
      console.log(response.data);
      alert("Thêm sản phẩm thành công!");
      setProduct({
        productId: "",
        barcode: "",
        name: "",
        category: "",
        brand: "",
        price: "",
        cost: "",
        stock: "",
        location: "",
        minStock: "",
        maxStock: "",
        status: "Cho phép kinh doanh",
        image: "",
        weight: "",
        unit: "",
        description: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response ? error.response.data : error.message);
      } else {
        console.error("General error:", error);
      }
      alert("Thêm sản phẩm thất bại!");
    }
  };

  return (
    <div>
      <h2>Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <label>Mã sản phẩm</label>
        <input type="text" name="productId" value={product.productId} onChange={handleChange} /><br />
        
        <label>Mã vạch</label>
        <input type="text" name="barcode" value={product.barcode} onChange={handleChange} /><br />
        
        <label>Tên sản phẩm *</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required /><br />
        
        <label>Danh mục</label>
        <input type="text" name="category" value={product.category} onChange={handleChange} /><br />

        <label>Thương hiệu</label>
        <input type="text" name="brand" value={product.brand} onChange={handleChange} /><br />
        
        <label>Giá bán *</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} required /><br />
        
        <label>Giá vốn</label>
        <input type="number" name="cost" value={product.cost} onChange={handleChange} /><br />
        
        <label>Tồn kho</label>
        <input type="number" name="stock" value={product.stock} onChange={handleChange} /><br />
        
        <label>Vị trí</label>
        <input type="text" name="location" value={product.location} onChange={handleChange} /><br />
        
        <label>Tồn kho tối thiểu</label>
        <input type="number" name="minStock" value={product.minStock} onChange={handleChange} /><br />
        
        <label>Tồn kho tối đa</label>
        <input type="number" name="maxStock" value={product.maxStock} onChange={handleChange} /><br />
        
        <label>Trạng thái</label>
        <select name="status" value={product.status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e as any)}>
          <option value="Cho phép kinh doanh">Cho phép kinh doanh</option>
          <option value="Ngừng kinh doanh">Ngừng kinh doanh</option>
        </select><br />
        <label>Hình ảnh</label>
        <input type="text" name="image" value={product.image} onChange={handleChange} /><br />
        
        <label>Trọng lượng</label>
        <input type="number" name="weight" value={product.weight} onChange={handleChange} /><br />
        
        <label>Đơn vị</label>
        <input type="text" name="unit" value={product.unit} onChange={handleChange} /><br />
        
        <label>Mô tả</label>
        <textarea name="description" value={product.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e as any)} /><br />
        
        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  );
}