

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signIn } from "../features/auth/authSlice";
// import { Link, useNavigate } from "react-router-dom";

// export default function SignIn() {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((s) => s.auth);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ identifier: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [isSuccess, setIsSuccess] = useState(false);

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!form.identifier || !form.password) {
//       setIsSuccess(false);
//       setMessage("Please enter your username/email and password");
//       return;
//     }

//     try {
//       const res = await dispatch(
//         signIn({
//           identifier: form.identifier, // can be username or email
//           password: form.password
//         })
//       );

//       if (res.meta.requestStatus === "fulfilled") {
//         setIsSuccess(true);
//         setMessage("Login successful! Redirecting...");
//         setTimeout(() => navigate("/"), 1500);
//       } else {
//         setIsSuccess(false);
//         setMessage(res.payload?.message || "Wrong username or password!");
//       }
//     } catch (err) {
//       setIsSuccess(false);
//       setMessage("Network error. Please try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form className="auth-card" onSubmit={submit}>
//         <div>
//           <h2>Sign In</h2>
//           <h5>Enter your credentials to access your account</h5>

//           {message && (
//             <div className={isSuccess ? "success" : "error"}>{message}</div>
//           )}
//         </div>

//         <div>
//           <label>Username or Email</label>
//           <input
//             placeholder="Enter your username or email"
//             value={form.identifier}
//             onChange={(e) =>
//               setForm({ ...form, identifier: e.target.value })
//             }
//           />
//         </div>

//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//         </div>

//         <button disabled={loading} type="submit">
//           {loading ? "Signing In..." : "Sign In"}
//         </button>

//         <div className="muted">
//           Don’t have an account? <Link to="/signup">Sign up</Link>
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
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
      setMessage("Please enter your email and password");
      return;
    }

    try {
      const res = await dispatch(signIn(form));
      if (res.meta.requestStatus === "fulfilled") {
        setIsSuccess(true);
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setIsSuccess(false);
        setMessage(res.payload?.message || "Wrong email or password!");
      }
    } catch {
      setIsSuccess(false);
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submit}>
        <h2>Sign In</h2>
        <h5>Enter your credentials to access your account</h5>

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
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button disabled={loading} type="submit">
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="muted">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
