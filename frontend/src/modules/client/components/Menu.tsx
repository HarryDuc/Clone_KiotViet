import Link from "next/link";

const Menu = () => {
  return (
    <div>
      <div id="top-bar" className="bg-blue-900 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div></div> {/* Phần trống bên trái */}
          <div className="text-yellow-500 text-xl font-bold">
            Décor & More
            <p className="text-sm text-center">- Bring Your Home To Life -</p>
          </div>
          <button className="bg-transparent border border-white text-white px-4 py-1 rounded hover:bg-white hover:text-blue-900 transition-colors">
            ĐĂNG NHẬP
          </button>
        </div>
      </div>
      <nav className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold">
            <img
              src="https://decorandmore.vn/wp-content/uploads/2022/03/Logo_Decor-More.png"
              alt="Logo Decor & More"
              className="w-sm"
            />
          </Link>
          <ul className="flex mt-4 no-underline">
            <li>
              <Link href="/" className="hover:text-yellow-400">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link href="/client/projects" className="hover:text-yellow-400">
                Dự Án
              </Link>
            </li>
            <li>
              <Link href="/client/clients" className="hover:text-yellow-400">
                Khách Hàng
              </Link>
            </li>
            <li>
              <Link href="/client/about" className="hover:text-yellow-400">
                Giới Thiệu
              </Link>
            </li>
            <li>
              <Link href="/client/services" className="hover:text-yellow-400">
                Dịch Vụ
              </Link>
            </li>
            <li>
              <Link href="/client/team" className="hover:text-yellow-400">
                Nhân Lực
              </Link>
            </li>
            <li>
              <Link href="/client/contact" className="hover:text-yellow-400">
                Liên Hệ
              </Link>
            </li>
            <li>
              <Link href="/client/careers" className="hover:text-yellow-400">
                Tuyển Dụng
              </Link>
            </li>
            <li>
              <Link href="/client/news" className="hover:text-yellow-400">
                Tin Tức
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
