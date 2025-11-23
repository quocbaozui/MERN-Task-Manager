import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom"; // Thêm Link để chuyển qua trang Register

import AuthContext from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);

    if (success) {
      if (!toast) toast.success("Đăng nhập thành công!");
      navigate("/dashboard");
    } else {
      toast.error("Đăng nhập không thành công");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      {/* Card chứa Form */}
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl font-bold text-primary mb-4">
            Đăng nhập
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered input-primary w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Input Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mật khẩu</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered input-primary w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Nút Submit */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </div>
          </form>

          {/* Chuyển sang trang Register */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="link link-primary font-bold">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
