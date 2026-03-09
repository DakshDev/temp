import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { IoMdLock, IoMdMail, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { IoShieldCheckmark } from "react-icons/io5"; 
import axios from 'axios';
import Cookies from 'universal-cookie';
import { AppContext } from "../context/AppContext";
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const cookies = new Cookies();
  const {adminToken, setAdminToken } = useContext(AppContext);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/login`, {
        email,
        password
      });

      if (response.data.status == "success") {
        cookies.set('admin_token', response.data.token, { path: '/admin', maxAge: 86400 });
        setAdminToken(response.data.token);
        toast.success("Loggedin Successfully.")

        setTimeout(()=>{
            navigate("/admin/dashboard");
        }, 1000)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Admin Credentials");
    } finally {
      setLoading(false);
    }
  };

     useEffect(()=>{
        if(adminToken){
            setLoading(true);
            navigate("/admin/dashboard");
        }
      },[])

  return (
    
        loading
        ?
        <> </>
        :
         <div dir="ltr" className="ltr min-h-screen flex items-center justify-center bg-[#F9FAFB] font-sans p-4">
      <div className="w-full max-w-[400px]">
        
        {/* Compact Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#94BD1C]/10 rounded-xl mb-4">
            <IoShieldCheckmark className="text-[#94BD1C] text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-[#111111] tracking-tight">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">Access the management console</p>
        </div>

        {/* Clean White Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <form className="space-y-5" onSubmit={handleAdminLogin}>
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <IoMdMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#94BD1C] focus:bg-white transition-all"
                  placeholder="admin@nawaya.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <IoMdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-11 pr-11 text-sm outline-none focus:border-[#94BD1C] focus:bg-white transition-all"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#94BD1C] hover:bg-[#83a919] text-white font-bold py-2.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 text-sm mt-2 shadow-sm cursor-pointer"
            >
              {loading ? "Verifying..." : "Sign In to Admin"}
            </button>
          </form>

          <div className="mt-6 text-center pt-5 border-t border-gray-100">
            <button 
              onClick={() => navigate("/login")}
              className="text-xs font-semibold text-gray-400 hover:text-[#94BD1C] transition-colors cursor-pointer"
            >
              Return to User Login
            </button>
          </div>
        </div>

        {/* Simple Footer */}
        <p className="mt-8 text-center text-[11px] text-gray-400 font-medium">
          &copy; 2025 Nawaya Community &bull; Internal Use Only
        </p>
      </div>
    </div>
      
  );
};

export default AdminLogin;