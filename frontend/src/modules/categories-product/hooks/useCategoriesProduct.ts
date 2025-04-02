import { useEffect, useState } from 'react';
import { CategoriesProduct } from '../types/categories-product.types';
import { getCategoriesProduct } from '../services/categories-product.service';

export const useCategoriesProduct = () => {
    const [categoriesProduct, setCategoriesProduct] = useState<CategoriesProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategoriesProduct();
            setCategoriesProduct(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    return { categoriesProduct, loading };
};
