import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Analytics from '../components/Analytics';
import UserManagement from '../components/UserManagement';
import UserDetailModal from '../components/UserDetailModal';
import BlogManagement from '../components/BlogManagement';
import { toast } from 'react-toastify';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [languageStats, setLanguageStats] = useState({});
  const [totalUsers, setTotalUsers] = useState(0);
  const [premiumCount, setPremiumCount] = useState(0);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [activePage, setActivePage] = useState('analytics'); // 'analytics', 'users', or 'blogs'
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  const [userData, setUserData] = useState([]);

  const { adminToken, setAdminToken } = useContext(AppContext);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });


      if (response.data.status === "success") {
        setIsAuthorized(true);
        setUserData(response.data.data.users || []);
        setLanguageStats(response.data.data.stats.languageStats || {});

        const stats = response.data.data.stats || {};
        setTotalUsers(stats.totalUsers || 0);
        setPremiumCount(stats.premiumUsers || 0);
        setWaitlistCount(stats.waitlistUsers || 0);
      } else {
        setIsAuthorized(false);
      }
    } catch (e) {
      setIsAuthorized(false);
      setAdminToken("");
      cookies.remove('admin_token', { path: '/' });
      navigate("/admin");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!adminToken) {
      navigate("/");
    } else {
      fetchUserData();
    }
  }, [adminToken]);

  useEffect(() => {
    if (selectedUser) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedUser]);

  const handleUpdateUser = async (userId, updates) => {
    try {
      setIsUpdating(true);
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/user/${userId}`,
        updates,
        {
          headers: { 
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (res.data.status === "success") {
        // Update user in the list
        setUserData(prev =>
          prev.map(u => (u._id === userId ? res.data.data : u))
        );

        // Update selected user
        setSelectedUser(res.data.data);
        
        // Refetch to update stats
        await fetchUserData();
        
        toast.success("User updated successfully!");
      } else {
        toast.error(res.data.message || "Failed to update user");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to update user. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/user/${userId}`,
        {
          headers: { 
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.status === "success") {
        // Remove user from list
        setUserData(prev => prev.filter(u => u._id !== userId));
        
        // Close modal
        setSelectedUser(null);
        
        // Refetch to update stats
        await fetchUserData();
        
        toast.success("User deleted successfully!");
      } else {
        toast.error(response.data.message || "Failed to delete user");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to delete user. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleBlogAccess = async (userId, canPostBlog) => {
    try {
      setIsUpdating(true);
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/user/toggle-author/${userId}`,
        { canPostBlog },
        {
          headers: { 
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (res.data.status === "success") {
        // Update user in the list
        setUserData(prev =>
          prev.map(u => (u._id === userId ? res.data.data : u))
        );

        // Update selected user
        setSelectedUser(res.data.data);
        
        toast.success(canPostBlog ? "Blog access granted!" : "Blog access revoked!");
      } else {
        toast.error(res.data.message || "Failed to update blog access");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to update blog access");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold">Loading Terminal...</div>;

  return (
    <div dir="ltr" className="ltr min-h-screen bg-[#F2F2F2] font-sans p-4 md:p-12">
      <div className="max-w-7xl mx-auto">

        {/* Header with Navigation Tabs */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#111111] tracking-tight mb-6">Admin Dashboard</h1>

          <div className="flex gap-3 border-b border-gray-200">
            <button
              onClick={() => setActivePage('analytics')}
              className={`px-6 py-3 font-bold text-sm transition-all relative cursor-pointer ${activePage === 'analytics'
                ? 'text-[#94BD1C]'
                : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              Analytics
              {activePage === 'analytics' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#94BD1C]"></div>
              )}
            </button>
            <button
              onClick={() => setActivePage('users')}
              className={`px-6 py-3 font-bold text-sm transition-all relative cursor-pointer ${activePage === 'users'
                ? 'text-[#94BD1C]'
                : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              User Management
              {activePage === 'users' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#94BD1C]"></div>
              )}
            </button>
            <button
              onClick={() => setActivePage('blogs')}
              className={`px-6 py-3 font-bold text-sm transition-all relative cursor-pointer ${activePage === 'blogs'
                ? 'text-[#94BD1C]'
                : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              Article Management
              {activePage === 'blogs' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#94BD1C]"></div>
              )}
            </button>
          </div>
        </div>

        {/* ANALYTICS PAGE */}
        {activePage === 'analytics' && (
          <Analytics
            totalUsers={totalUsers}
            premiumCount={premiumCount}
            waitlistCount={waitlistCount}
            languageStats={languageStats}
          />
        )}

        {/* USER MANAGEMENT PAGE */}
        {activePage === 'users' && (
          <UserManagement
            userData={userData}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            setSelectedUser={setSelectedUser}
          />
        )}

        {/* BLOG MANAGEMENT PAGE */}
        {activePage === 'blogs' && (
          <BlogManagement adminToken={adminToken} />
        )}
      </div>

      {/* MODAL */}
      <UserDetailModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        handleUpdateUser={handleUpdateUser}
        handleDeleteUser={handleDeleteUser}
        handleToggleBlogAccess={handleToggleBlogAccess}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Admin;