import { create } from "zustand";
import { ProductsService } from "../services/product.service";
import { Product, CreateProductDto, UpdateProductDto } from "../types/product.type";

interface ProductsState {
    products: Product[];
    fetchProducts: () => Promise<void>;
    addProduct: (product: CreateProductDto, files: File[]) => Promise<void>;
    updateProduct: (id: string, product: UpdateProductDto, files?: File[], removedImages?: string[]) => Promise<void>;
    removeProduct: (id: string) => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
    products: [],

    /**
     * 📌 Lấy danh sách sản phẩm từ backend
     */
    fetchProducts: async () => {
        try {
            const products = await ProductsService.getAll();
            set({ products });
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách sản phẩm:", error);
        }
    },

    /**
     * 📌 Thêm sản phẩm mới
     * ✅ Upload ảnh trước khi gửi dữ liệu lên backend
     */
    addProduct: async (product, files) => {
        try {
            const createdProduct = await ProductsService.create(product);
            set((state) => ({ products: [...state.products, createdProduct] }));
        } catch (error) {
            console.error("❌ Lỗi khi thêm sản phẩm:", error);
        }
    },

    /**
     * 📌 Cập nhật sản phẩm theo ID
     * ✅ Nếu có ảnh mới, sẽ upload và cập nhật
     * ✅ Nếu có ảnh bị xóa, sẽ loại bỏ khỏi `gallery`
     */
    updateProduct: async (id, product, files, removedImages) => {
        try {
            const updatedProduct = await ProductsService.update(id, product, files, removedImages);
            set((state) => ({
                products: state.products.map((p) => (p._id === id ? updatedProduct : p)),
            }));
        } catch (error) {
            console.error(`❌ Lỗi khi cập nhật sản phẩm ID ${id}:`, error);
        }
    },

    /**
     * 📌 Xóa sản phẩm theo ID
     */
    removeProduct: async (id) => {
        try {
            await ProductsService.delete(id);
            set((state) => ({ products: state.products.filter((p) => p._id !== id) }));
        } catch (error) {
            console.error(`❌ Lỗi khi xóa sản phẩm ID ${id}:`, error);
        }
    },
}));
