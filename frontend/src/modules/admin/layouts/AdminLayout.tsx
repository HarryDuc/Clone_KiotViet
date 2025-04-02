import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            {/* Sidebar (25%) */}
            <AdminSidebar />

            {/* Nội dung chính (75%) */}
            <main className="ml-1/4 w-3/4 min-h-screen p-6 bg-gray-100">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
