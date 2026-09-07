import { useAuth } from "../../core/state/AuthContext";
import "./account.css";
export default function AccountPage() {
  const { user } = useAuth();
  return (
    <div className="page account">
      <div className="account-card">
        <h2>My Account</h2>
        <p>
          <b>Name:</b> {user?.name || "—"}
        </p>
        <p>
          <b>Email:</b> {user?.email || "—"}
        </p>
        <p>
          <b>Role:</b> {user?.role || "Administrator"}
        </p>
        <p>
          <b>Username:</b> {user?.username || "—"}
        </p>
      </div>
    </div>
  );
}
