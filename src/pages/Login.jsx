import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../core/state/AuthContext";
import { authService } from "../core/services/authService";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefaault();

        setError("");
        setLoading(true);

        try {
            const response = await authService.login({
                email,
                password
            });

            login(response);

            const loggedInUser = response.user;

            if (loggedInUser.role === "Admin") {
                navigate("/admin");
            } else if (loggedInUser.role === "Librarian") {
                navigate("/librarian");
            } else if (loggedInUser.role === "Member") {
                navigate("/dashboard")
            } else {
                navigate("/unauthorized")
            }
        } catch (error) {
            setError( error.message || "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            {error && <p>{error}</p>}

            <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            
            <button type="submit" disabled={loading}>
                {loading ? "Logging in.." : "Login"}
            </button>
        </form>
    );
}