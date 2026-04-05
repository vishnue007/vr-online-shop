import { Link, useNavigate } from "react-router-dom";
import Input from "../components/shared/Input";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADMIN_LOGIN } from "../graphql/mutations/auth";
import type { LoginResponse, LoginVariables } from "../types/login";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [login, { loading, error }] = useMutation<LoginResponse, LoginVariables>(ADMIN_LOGIN);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await login({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      const token = res?.data?.login?.token;

      if (!token) {
        throw new Error("Token not received");
      }

      // ✅ Store token
      localStorage.setItem("token", token);

      // ✅ Redirect
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Admin Panel
          </h1>
          <p className="text-gray-300 text-sm mt-2">
            Secure access to dashboard
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-2">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-2">Password</label>
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-sm">
              {error.message}
            </p>
          )}

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-300">
              <input type="checkbox" className="accent-indigo-500" /> Remember me
            </label>
            <Link
              to="#"
              className="text-indigo-400 hover:text-indigo-300 transition"
            >
              Forgot?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold tracking-wide transition duration-300 shadow-lg shadow-indigo-500/30"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-white/20"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-white/20"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition">
            Google
          </button>
          <button className="py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition">
            GitHub
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;