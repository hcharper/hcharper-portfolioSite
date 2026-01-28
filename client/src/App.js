import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import SingleBlog from './pages/SingleBlog';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<SingleBlog />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-login" element={<Login />} />
            <Route 
              path="/admin-dash" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
