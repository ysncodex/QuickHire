import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
