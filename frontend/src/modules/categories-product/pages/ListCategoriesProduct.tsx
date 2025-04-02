import { useCategoriesProduct } from "../hooks/useCategoriesProduct";
import Link from "next/link";

const ListCategoriesProduct = () => {
    const { categoriesProduct, loading } = useCategoriesProduct();

    if (loading) return <p>Đang tải danh mục sản phẩm...</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Danh sách danh mục sản phẩm</h1>
            <ul>
                {categoriesProduct.map((category) => (
                    <li key={category._id} className="border-b py-2">
                        <Link href={`/categories-product/${category.slug}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListCategoriesProduct;
