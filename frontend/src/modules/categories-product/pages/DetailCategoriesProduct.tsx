import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCategoriesProductById } from '../services/categories-product.service';
import { CategoriesProduct } from '../types/categories-product.types';

const DetailCategoriesProduct = () => {
    const router = useRouter();
    const { slug } = router.query; // ✅ Lấy slug từ URL
    const [category, setCategory] = useState<CategoriesProduct | null>(null);

    useEffect(() => {
        if (slug) {
            getCategoriesProductById(slug as string).then(setCategory).catch(() => {
                console.error("❌ Không tìm thấy danh mục!");
            });
        }
    }, [slug]);

    if (!category) return <p>Đang tải dữ liệu...</p>;

    return (
        <div>
            <h1>Chi tiết danh mục: {category.name}</h1>
            <p><strong>Mô tả:</strong> {category.description}</p>
            {category.parentCategory && <p><strong>Danh mục cha:</strong> {category.parentCategory}</p>}
            {category.subCategories && category.subCategories.length > 0 && (
                <div>
                    <h3>Danh mục con:</h3>
                    <ul>
                        {category.subCategories.map(sub => (
                            <li key={sub}>{sub}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DetailCategoriesProduct;
