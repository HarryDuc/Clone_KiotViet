import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="space-y-4">
            <Link href="/admin/dashboard" className="block p-3 bg-gray-300 rounded">Dashboard</Link>
            <Link href="/admin/users" className="block p-3 bg-gray-300 rounded">Quản lý Người dùng</Link>
            <Link href="/admin/posts" className="block p-3 bg-gray-300 rounded">Quản lý Bài viết</Link>
            <Link href="/admin/products" className="block p-3 bg-gray-300 rounded">Quản lý Sản phẩm</Link>
        </div>
    );
};

export default Sidebar;
