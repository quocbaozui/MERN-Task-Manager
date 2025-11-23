import React, { useContext, useState } from "react";

import AuthContext from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await register(username, email, password);

    if (success) {
      if (!toast) toast.success("Đăng ký thành công!");
      navigate("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      {/* Khung Card */}
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl font-bold text-primary mb-4">
            Đăng ký tài khoản
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Username */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tên người dùng</span>
              </label>
              <input
                type="text"
                placeholder="Ví dụ: nguyenvana"
                className="input input-bordered input-primary w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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

            {/* Nút Đăng ký */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Đang tạo tài khoản..." : "Đăng ký ngay"}
              </button>
            </div>
          </form>

          {/* Link chuyển sang Login */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Đã có tài khoản?{" "}
              <Link to="/login" className="link link-primary font-bold">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
