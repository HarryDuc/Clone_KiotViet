import Link from "next/link";

const AdminMenu = () => {
    return (
        <nav>
            <ul className="space-y-3">
                <li>
                    <Link href="/admin/dashboard" className="block p-2 rounded hover:bg-gray-700">
                        📊 Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/admin/products" className="block p-2 rounded hover:bg-gray-700">
                        🛍️ Quản lý sản phẩm
                    </Link>
                </li>
                <li>
                    <Link href="/admin/orders" className="block p-2 rounded hover:bg-gray-700">
                        📦 Đơn hàng
                    </Link>
                </li>
                <li>
                    <Link href="/admin/users" className="block p-2 rounded hover:bg-gray-700">
                        👥 Người dùng
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminMenu;
