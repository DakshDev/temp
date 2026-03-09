import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff, IoMdLock, IoMdMail, IoMdPerson } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { AppContext } from "../context/AppContext";
import Logo from "../assets/nawaya-logo.png";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "../schemas/signup.schema";
import { useTranslation } from "../hooks/useTranslation";
import { useLang } from '../context/LanguageContext';

const Signup = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { token, setToken } = useContext(AppContext);

  const tr = useTranslation();
  const { lang } = useLang();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (token) navigate("/user");
  }, [token]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,
        data
      );

      if (response.data.status === "success") {

        toast.success("Account created successfully");
        reset();

        setTimeout(() => {
          navigate("/login");
        }, 800);

      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2] font-sans selection:bg-[#94BD1C]/30">
      <div className="w-full max-w-[1100px] h-[90vh] md:h-[700px] bg-white rounded-none md:rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row m-0 md:m-6">

        {/* LEFT SIDE */}
        <div
          className="hidden md:flex w-1/2 relative p-12 flex-col justify-center items-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #94BD1C 0%, #29C28C 100%)" }}
        >
          {/* Floating Decorative Elements */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-[30%] right-[15%] w-24 h-24 bg-white/5 rounded-full blur-lg" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-8 animate-fadeIn">
            {/* Logo with Glassmorphic Container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl animate-float">
                <img src={Logo} alt="Nawaya Logo" className="w-16 h-16" />
              </div>
            </div>
            
            {/* Text with Enhanced Typography */}
            <div className="space-y-3">
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-lg animate-slideUp" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                {tr("signup_left_headline_1")}
              </h2>
              <div className="w-20 h-1 bg-white/40 mx-auto rounded-full animate-expandWidth"></div>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-lg animate-slideUp" style={{ animationDelay: '0.2s', textShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                {lang === "de" ? (
                  <>
                  Begleite mit <br /> Sinn.
                  </>
                ): tr("signup_left_headline_2")}
              </h2>
            </div>
          </div>
          
          {/* Add custom animations */}
          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes expandWidth {
              from { width: 0; opacity: 0; }
              to { width: 5rem; opacity: 1; }
            }
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
            .animate-fadeIn {
              animation: fadeIn 1s ease-out;
            }
            .animate-slideUp {
              animation: slideUp 0.8s ease-out forwards;
              opacity: 0;
            }
            .animate-expandWidth {
              animation: expandWidth 0.8s ease-out 0.4s forwards;
              width: 0;
            }
          `}</style>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 bg-white">
          <div className="mb-10">
            <h3 className="text-3xl font-black text-[#111111] tracking-tight">
              {tr("signup_create_account")}
            </h3>
            <p className="text-[#888888] mt-2 font-medium">
             {tr("signup_subtitle")}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ltr:ml-1 rtl:mr-1 block text-left rtl:text-right">
                {tr("signup_full_name")}
              </label>
              <div className="relative">
                <IoMdPerson className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("name")}
                  placeholder={tr("signup_full_name_placeholder")}
                  className="w-full pl-12 pr-6 py-4 bg-[#F8FAF6] rounded-2xl outline-none focus:border-[#94BD1C]/30 border-2 border-transparent"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ltr:ml-1 rtl:mr-1 block text-left rtl:text-right">
                 {tr("signup_email")}
              </label>
              <div className="relative">
                <IoMdMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("email")}
                  placeholder={tr("signup_email_placeholder")}
                  className="w-full pl-12 pr-6 py-4 bg-[#F8FAF6] rounded-2xl outline-none border-2 border-transparent focus:border-[#94BD1C]/30"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ltr:ml-1 rtl:mr-1 block text-left rtl:text-right">
                {tr("signup_password")}
              </label>
              <div className="relative">
                <IoMdLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder={tr("signup_password_placeholder")}
                  className="w-full pl-12 pr-12 py-4 bg-[#F8FAF6] rounded-2xl outline-none border-2 border-transparent focus:border-[#94BD1C]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 cursor-pointer rounded-2xl text-white font-bold shadow-lg disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(90deg, #94BD1C 0%, #29C28C 100%)",
              }}
            >
              {loading ? tr("signup_creating") : tr("signup_button")}
            </button>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500 font-medium">
                {tr("signup_login_question")}{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-[#94BD1C] font-bold cursor-pointer hover:underline"
                >
                  {tr("signup_login_link")}
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;