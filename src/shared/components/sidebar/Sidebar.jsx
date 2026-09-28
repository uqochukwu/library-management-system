import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router";
import { useAuth } from "../../../core/state/AuthContext";
import {
  Users,
  Repeat2,
  BookImage,
  BookOpen,
  LayoutDashboard,
  Summary,
  StickyNotePlus,
  Settings,
  LogOut,
} from "lucide-react";
import "../../../index.css";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="mb-shell">
      <aside>
        <div className="mb-brand">
          ✿<span>LMS</span>
        </div>
        <nav>
          {user?.role === "Admin" && (
            <>
              <NavLink to="/admin">
                <LayoutDashboard size={15} />
                Dashboard
              </NavLink>
              <NavLink to="/catalog">
                <BookImage size={15} />
                Catalog
              </NavLink>
              <NavLink to="/books">
                <BookOpen size={15} />
                Books
              </NavLink>
              <NavLink to="/members">
                <Users size={15} />
                Users
              </NavLink>
              <NavLink to="/reports">
                <Summary size={15} />
                Reports
              </NavLink>
              <NavLink to="/reservations">
                <StickyNotePlus size={15} />
                Reservations
              </NavLink>
            </>
          )}

          {user?.role === "Librarian" && (
            <>
              <NavLink to="/librarian">
                <LayoutDashboard size={15} />
                Dashboard
              </NavLink>
              <NavLink to="/catalog">
                <BookImage size={15} />
                Catalog
              </NavLink>
              <NavLink to="/members">
                <Users size={15} />
                Users
              </NavLink>
              <NavLink to="/reports">
                <Summary size={15} />
                Reports
              </NavLink>
              <NavLink to="/reservations">
                <StickyNotePlus size={15} />
                Reservations
              </NavLink>
            </>
          )}

          {user?.role === "Member" && (
            <>
              <NavLink to="/dashboard">
                <LayoutDashboard size={15} />
              </NavLink>
              <NavLink to="/books">
                <BookOpen size={15} />
                Books
              </NavLink>
              <NavLink to="/loans">
                <Repeat2 size={15} />
              </NavLink>
            </>
          )}
        </nav>

        <button onClick={handleLogout}>
          <LogOut size={14} />
          Log Out
        </button>
      </aside>

      <header className="app-header">
        <div className="header-user">
          <span className="hamb">☰</span>

          <div className="user-icon">👤</div>

          <div className="user-info">
            <span className="user-name">
              {(user?.firstName && user?.lastName) || "User"}
            </span>

            <span className="user-role">{user?.role || "Member"}</span>
          </div>
        </div>

        <div className="header-right">
          <div className="date-time">
            <span className="time">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

            <span className="date">
              {currentTime.toLocaleDateString([], {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          {user?.role === "Admin" && (
            <>
              <span className="header-divider">|</span>
              <Link to="/settings" className="settings-button">
                <Settings size={25} />
              </Link>
              <button className="settings-button" title="Settings"></button>
            </>
          )}
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
