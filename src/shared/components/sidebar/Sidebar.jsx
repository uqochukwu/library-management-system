import { NavLink } from "react-router";
import { LayoutDashboard, Compass, BookOpen, Users, /*Building2,*/ } from "lucide-react";
import "./sidebar.css";


const navigationItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Catalog",
    path: "/catalog",
    icon: Compass,
  },
  {
    name: "Books",
    path: "/books",
    icon: BookOpen,
  },
  {
    name: "Members",
    path: "/members",
    icon: Users,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <img alt="LMS Library" />
      </div>

      <nav className="sidebar-navigation">

        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon className="sidebar-icon" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;