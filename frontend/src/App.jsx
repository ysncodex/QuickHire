import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import JobListings from './pages/JobListings';
import JobDetail from './pages/JobDetail';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="job-listings" element={<JobListings />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
