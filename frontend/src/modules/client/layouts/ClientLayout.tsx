import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex-col min-h-screen">
      {/* 🏠 Header */}
      <Menu />

      {/* 📌 Nội dung chính */}
      <main className="flex-grow container mx-auto p-6">{children}</main>

      {/* 📌 Footer */}
      <Footer />
    </div>
  );
};

export default ClientLayout;
