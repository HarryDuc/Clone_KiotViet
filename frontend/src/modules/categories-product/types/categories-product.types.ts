export interface CategoriesProduct {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    parentCategory?: string | null;
    subCategories?: string[];
    createdAt?: string;
    updatedAt?: string;
}
