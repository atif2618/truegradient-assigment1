


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setIsSuccess(false);
      setMessage("Please fill in all fields");
      return;
    }

    const res = await dispatch(signUp(form));
    if (res.meta.requestStatus === "fulfilled") {
      setIsSuccess(true);
      setMessage("Sign up completed! Redirecting...");
      setTimeout(() => navigate("/signin"), 1500);
    } else {
      setIsSuccess(false);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submit}>
        <h2>Sign Up</h2>
        <h5>Create an account to get started</h5>

        {message && (
          <div className={isSuccess ? "success" : "error"}>{message}</div>
        )}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Create a password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button disabled={loading} type="submit">
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="muted">
          Already have an account? <Link to="/signin">Sign in</Link>
        </div>
      </form>
    </div>
  );
}

