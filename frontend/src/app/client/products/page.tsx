// src/app/products/page.tsx
"use client";

import Link from "next/link";
import axiosClient from "../../../config/axiosClient";
import React, { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  brand?: {
    _id: string;
    name: string;
  };
  category?: {
    _id: string;
    name: string;
  };
  status?: string;
  image?: string;
  description?: string;
  location?: string;
}

interface Filter {
  status: string;
  brand: string;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filter>({
    status: "",
    brand: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filters, products]);

  const fetchProducts = async () => {
    try {
      const res = await axiosClient.get("/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      setError(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (filters.status) {
      filtered = filtered.filter(product => product.status === filters.status);
    }

    if (filters.brand) {
      filtered = filtered.filter(product => product.brand?._id === filters.brand);
    }

    if (filters.category) {
      filtered = filtered.filter(product => product.category?._id === filters.category);
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  // Get unique values for filters
  const statuses = Array.from(new Set(products.map(p => p.status).filter(Boolean)));
  const brands = Array.from(new Set(products.map(p => p.brand?.name).filter(Boolean)));
  const categories = Array.from(new Set(products.map(p => p.category?.name).filter(Boolean)));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
      
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2">Trạng thái:</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Tất cả</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Thương hiệu:</label>
          <select
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Tất cả</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Danh mục:</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Tất cả</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center">Không có sản phẩm nào</div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <Link href={`/client/products/${product._id}`}>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover rounded"
                    />
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-lg font-bold text-red-600 mb-2">
                  {product.price.toLocaleString('vi-VN')} VNĐ
                </p>
                <div className="text-gray-600">
                  {product.brand && <p>Thương hiệu: {product.brand.name}</p>}
                  {product.category && <p>Danh mục: {product.category.name}</p>}
                  {product.status && <p>Trạng thái: {product.status}</p>}
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
