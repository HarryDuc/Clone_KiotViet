import React from "react";

interface CategoriesProductLayoutProps {
    children: React.ReactNode;
}

export const CategoriesProductLayout: React.FC<CategoriesProductLayoutProps> = ({ children }) => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Quản lý danh mục sản phẩm</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                {children}
            </div>
        </div>
    );
};
