import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { authService } from "../../core/services/authService";
import { useAuth } from "../../core/state/AuthContext";
import "./auth.css";

function Auth({ mode }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = 
        mode === "login"
          ? await authService.login({
              email: form.email,
              password: form.password,
            })
          : await authService.register(form);
      if (mode === "login") {
        login(data); 
        console.log(data);
        if (data.user.role === "Admin"){
          nav("/admin");
        } else if (data.user.role === "Librarian") {
          nav("/librarian");
        } else if (data.user.role === "Member") {
          nav("/dashboard");
        }
      } else nav("/login");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          ✿<b>LMS</b>
          <span>LIBRARY</span>
        </div>
        <h1>{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
        <p>
          {mode === "login"
            ? "Sign in to manage your library."
            : "Register a new library account."}
        </p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={submit}>
          {mode !== "login" && (
            <>
              <input
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
              <input
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
              <input
                placeholder="Contact Number"
                value={form.contactNumber}
                onChange={(e) =>
                  setForm({ ...form, contactNumber: e.target.value })
                }
              />
            </>
          )}
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button disabled={busy}>{busy ? "PLEASE WAIT" : "CONTINUE"}</button>
        </form>
        <div className="auth-links">
          {mode === "login" ? (
            <>
              <Link to="/forgot-password">Forgot Password?</Link>
              <Link to="/register">Create account</Link>
            </>
          ) : (
            <Link to="/login">Already have an account? Sign in</Link>
          )}
        </div>
      </div>
    </div>
  );
}
export const Login = () => <Auth mode="login" />;
export const Register = () => <Auth mode="register" />;
export function Forgot() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          ✿<b>LMS</b>
        </div>
        <h1>Forgot Password</h1>
        <p>Enter your email and we'll help you reset your password.</p>
        <input placeholder="Email" />
        <button>SUBMIT</button>
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
}
