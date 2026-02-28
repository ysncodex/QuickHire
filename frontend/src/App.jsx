import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import JobListings from './pages/JobListings';
import JobDetail from './pages/JobDetail';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      {/* The Layout component wraps all these routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
