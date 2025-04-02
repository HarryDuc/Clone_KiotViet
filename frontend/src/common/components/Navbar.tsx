import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Panel</h1>

            <div className="space-x-4">
                <Link href="/auth/login" className="px-4 py-2 bg-white text-blue-600 rounded">
                    Đăng nhập
                </Link>
                <Link href="/auth/register" className="px-4 py-2 bg-white text-blue-600 rounded">
                    Đăng ký
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
