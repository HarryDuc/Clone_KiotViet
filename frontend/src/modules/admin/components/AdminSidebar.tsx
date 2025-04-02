import AdminMenu from "./AdminMenu";

const AdminSidebar = () => {
    return (
        <aside className="w-1/4 h-screen bg-gray-800 text-white p-4 fixed">
            <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
            <AdminMenu />
        </aside>
    );
};

export default AdminSidebar;
