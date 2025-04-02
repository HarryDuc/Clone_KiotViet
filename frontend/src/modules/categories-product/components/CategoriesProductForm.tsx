import { useState, useEffect } from 'react';
import { createCategoriesProduct, updateCategoriesProduct, getCategoriesProduct } from '../services/categories-product.service';
import { CategoriesProduct } from '../types/categories-product.types';

interface Props {
    category?: CategoriesProduct;
    onSuccess: () => void;
}

const CategoriesProductForm: React.FC<Props> = ({ category, onSuccess }) => {
    const [name, setName] = useState(category?.name || '');
    const [description, setDescription] = useState(category?.description || '');
    const [parentCategory, setParentCategory] = useState(category?.parentCategory || '');
    const [categories, setCategories] = useState<CategoriesProduct[]>([]);

    // ✅ Lấy danh sách danh mục có thể chọn làm danh mục cha
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategoriesProduct();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const categoryData = { name, description, parentCategory: parentCategory || null };

        if (category) {
            await updateCategoriesProduct(category._id, categoryData);
        } else {
            await createCategoriesProduct(categoryData);
        }

        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên danh mục"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả danh mục"
            />

            {/* ✅ Dropdown chọn danh mục cha */}
            <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
                <option value="">Chọn danh mục cha (nếu có)</option>
                {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <button type="submit">{category ? 'Cập nhật' : 'Tạo danh mục'}</button>
        </form>
    );
};

export default CategoriesProductForm;
