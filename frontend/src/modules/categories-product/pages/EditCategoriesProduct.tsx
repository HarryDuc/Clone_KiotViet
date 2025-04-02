import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CategoriesProductForm from '../components/CategoriesProductForm';
import { getCategoriesProductById, updateCategoriesProduct } from '../services/categories-product.service';
import { CategoriesProduct } from '../types/categories-product.types';

interface EditCategoriesProductProps {
    slug: string;
}

const EditCategoriesProductPage: React.FC<EditCategoriesProductProps> = ({ slug }) => {
    const router = useRouter();
    const [category, setCategory] = useState<CategoriesProduct | null>(null);

    useEffect(() => {
        if (slug) {
            getCategoriesProductById(slug).then(setCategory);
        }
    }, [slug]);

    const handleUpdate = async (data: { name: string; description?: string; parentCategory?: string }) => {
        if (!category) return;
        try {
            await updateCategoriesProduct(category._id, data);
            router.push('/categories-product/list'); // ✅ Điều hướng sau khi cập nhật thành công
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật danh mục:", error);
        }
    };

    if (!category) return <p>Đang tải dữ liệu...</p>;

    return (
        <div>
            <h1>Chỉnh sửa danh mục: {category.name}</h1>
            <CategoriesProductForm category={category} onSuccess={handleUpdate} />
        </div>
    );
};

export default EditCategoriesProductPage;
