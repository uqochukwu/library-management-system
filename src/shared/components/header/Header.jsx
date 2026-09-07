import { User } from "lucide-react";
import "./Header.css";

function Header() {
  return (
    <header className="header">

      <div className="user-info">

        <User className="user-icon" />

        <div>
          <h3>Ugochukwu</h3>
          <p>Admin</p>
        </div>

      </div>

    </header>
  );
}

export default Header;