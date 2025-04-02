import axios from 'axios';
import { CategoriesProduct } from '../types/categories-product.types';

const API_URL = '/api/categories-product';

export const getCategoriesProduct = async (): Promise<CategoriesProduct[]> => {
    const response = await axios.get<CategoriesProduct[]>(`${API_URL}`);
    return response.data;
};

export const getCategoriesProductById = async (id: string): Promise<CategoriesProduct> => {
    const response = await axios.get<CategoriesProduct>(`${API_URL}/${id}`);
    return response.data;
};

export const createCategoriesProduct = async (categoryData: Partial<CategoriesProduct>): Promise<CategoriesProduct> => {
    const response = await axios.post<CategoriesProduct>(`${API_URL}`, categoryData);
    return response.data;
};

export const updateCategoriesProduct = async (id: string, categoryData: Partial<CategoriesProduct>): Promise<CategoriesProduct> => {
    const response = await axios.put<CategoriesProduct>(`${API_URL}/${id}`, categoryData);
    return response.data;
};

export const deleteCategoriesProduct = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
