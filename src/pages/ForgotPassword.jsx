import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { forgotPasswordSchema } from "../schemas/forgot-password";
import { getLanguage } from "../utils/getLanguage";
import { useTranslation } from "../hooks/useTranslation";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const tr = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {

    const language = getLanguage();

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/forgot-password`,
        {
          email: data.email,
          language
        }
      );

      toast.success(
         language === "ar"
          ? tr("forgot_toast_success_ar")
          : tr("forgot_toast_success")

      );
      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message || tr("forgot_toast_error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2] font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-black text-[#111111] mb-2">
          {tr("forgot_title")}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {tr("forgot_subtitle")}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              {tr("forgot_email")}
            </label>
            <div className="relative mt-2">
              <IoMdMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                {...register("email")}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#94BD1C]"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#94BD1C] to-[#29C28C] disabled:opacity-50"
          >
            {loading ? tr("forgot_sending") : tr("forgot_button")}
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 font-medium">
            {tr("forgot_back_question")}{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#94BD1C] font-bold cursor-pointer hover:underline"
            >
              {tr("forgot_back_link")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
