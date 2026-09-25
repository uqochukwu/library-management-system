import { NavLink, Outlet } from "react-router";
import { useAuth } from "../../../core/state/AuthContext";
import {
  Users,
  Repeat2,
  BookImage,
  BookOpen,
  LayoutDashboard,
  Summary,
  StickyNotePlus,
  LogOut,
} from "lucide-react";
import "../../../index.css"

export default function Sidebar() {
  const { user, logout } = useAuth();

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

        <button
          onClick={() => {
            logout;
          }}
        >
          <LogOut size={14} />
          Log Out
        </button>
      </aside>

      <header>
        <span className="hamb">☰</span>
        <h2>Library Management System</h2>
        <div className="admin">Admin</div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
