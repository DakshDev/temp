import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import { resetPasswordSchema } from "../schemas/reset-password.schema";
import { useTranslation } from "../hooks/useTranslation";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");

  const tr = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      navigate("/login");
    }
  }, [token]);

  const onSubmit = async (data) => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password`,
        {
          token,
          password: data.password,
        }
      );

      if (res.data.status === "success") {
        toast.success(tr("reset_success"));
        reset();
        navigate("/login");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          tr("reset_error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2] font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-black text-[#111111] mb-2">
           {tr("reset_title")}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
           {tr("reset_subtitle")}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Password */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              {tr("reset_new")}
            </label>
            <div className="relative mt-2">
              <IoMdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#94BD1C]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              {tr("reset_confirm")}
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#94BD1C]"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#94BD1C] to-[#29C28C] disabled:opacity-50"
          >
            {loading ? tr("reset_loading") : tr("reset_button")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
