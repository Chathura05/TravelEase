import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const PublicLayout = () => {
  return (
    <div className="page-frame">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
