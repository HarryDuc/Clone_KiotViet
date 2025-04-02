import { useState } from 'react';
import { useRouter } from 'next/router';
import CategoriesProductForm from '../components/CategoriesProductForm';
import { createCategoriesProduct } from '../services/categories-product.service';
import { removeVietnameseTones } from '@/utils/slug.utils';

const CreateCategoriesProduct = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCreate = async (data: { name: string; description?: string; parentCategory?: string }) => {
        setLoading(true);
        try {
            const slug = removeVietnameseTones(data.name); // ✅ Tạo slug từ tên
            await createCategoriesProduct({ ...data, slug });
            router.push('/categories-product/list'); // ✅ Điều hướng sau khi tạo thành công
        } catch (error) {
            console.error("❌ Lỗi khi tạo danh mục:", error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Tạo danh mục sản phẩm mới</h1>
            <CategoriesProductForm onSuccess={handleCreate} />
            {loading && <p>Đang xử lý...</p>}
        </div>
    );
};

export default CreateCategoriesProduct;
