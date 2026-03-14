import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import Exclusive from '../pages/Exclusive'
import Admin from '../pages/Admin'
import Footer from '../components/Footer'
import UserDashboard from '../pages/UserDashboard'
import Login from '../pages/Login'

import { ToastContainer } from 'react-toastify';
import AdminLogin from '../pages/AdminLogin'
import Guide from '../pages/Guide/Guide'
import Grower from '../pages/Grower/Grower'
import Thankyou from '../pages/Thankyou'
import PrivacyPage from '../pages/PrivacyPage'
import TermPage from '../pages/TermsPage'
import CookiePolicy from '../pages/CookiePolicy'
import ImprintPage from '../pages/ImprintPage'
import Signup from '../pages/SignUp'
import ResetPassword from '../pages/ResetPassword'
import ForgotPassword from '../pages/ForgotPassword'
import CookieBanner from '../components/CookieBanner'
import WriteBlog from '../pages/Blog/WriteBlog'
import MyBlogs from '../pages/Blog/MyBlogs'
import BlogListing from '../pages/Blog/BlogListing'
import BlogDetail from '../pages/Blog/BlogDetail'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminProtectedRoute from '../components/AdminProtectedRoute'
import Chatbot from '../components/Chatbot'

const AppContent = ({ role, setRole }) => {
  const hideLangToggle = false; // Language toggle always visible in navbar
  const [isLoaded, setLoaded] = useState(false)
  useEffect(() => {
    if (document.readyState === "complete") {
    (() => setLoaded(true))();
    } else {
      window.addEventListener("load", () => setLoaded(true));
    }
  }, [])

  return (
    <>
      <Navbar role={role} setRole={setRole} hideLangToggle={hideLangToggle} />
      <Routes>
        <Route path='/' element={<Grower role={role} />} />
        <Route path='/guide' element={<Guide role={role} />} />
        <Route path='/exclusive' element={<Exclusive role={role} />} />
        <Route path='/admin/dashboard' element={<AdminProtectedRoute><Admin /></AdminProtectedRoute>} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/user' element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/thankyou' element={<ProtectedRoute><Thankyou /></ProtectedRoute>} />
        <Route path='/privacy-policy' element={<PrivacyPage />} />
        <Route path='/terms-of-use' element={<TermPage />} />
        <Route path='/cookie-policy' element={<CookiePolicy />} />
        <Route path='/imprint' element={<ImprintPage />} />
        <Route path="/author/write" element={<ProtectedRoute requireBlogAccess><WriteBlog /></ProtectedRoute>} />
        <Route path="/author/blog-articles" element={<ProtectedRoute><MyBlogs /></ProtectedRoute>} />
        <Route path="/blog" element={<BlogListing />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
      {isLoaded && (
        <>
        <Chatbot />
        <CookieBanner />
        <ToastContainer />
        </>
      )}
    </>
  );
};

const AppRoutes = () => {
  const [role, setRole] = useState('grower')

  return (
    <BrowserRouter>
      <AppContent role={role} setRole={setRole} />
    </BrowserRouter>
  )
}

export default AppRoutes
