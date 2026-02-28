import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
