import {Routes, Route, Navigate, NavLink, Outlet } from "react-router"
import { Users, Repeat2, BookImage, BookOpen, StickyNotePlus, LogOut } from "lucide-react"
import MembersPage from "./pages/members/MembersPage"
import { Login, Register, Forgot } from "./pages/auth/AuthPages"
import DashboardPage from "./pages/dashboard/DashboardPage"
import BooksPage from "./pages/books/BooksPage"
import CatalogPage from "./pages/catalog/CatalogPage"
import LoansPage from "./pages/loans/LoansPage"
import ReservationsPage from "./pages/loans/ReservationsPage"
import { HistoryPage } from "./pages/reports/ReportsPage"
import "./index.css"




function Shell() {
  return (
    <div className="mb-shell">
      <aside>
        <div className="mb-brand">
          ✿<span>LMS</span>
        </div>
        <nav>
          <NavLink to="/dashboard">
            <Users size={15} />
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
          <NavLink to="/loans">
            <Repeat2 size={15} />
            Loans
          </NavLink>
          <NavLink to="/reports">
            <Repeat2 size={15} />
            Reports
          </NavLink>
          <NavLink to="/reservations">
            <StickyNotePlus size={15} />
            Reservations
          </NavLink>
        </nav>
        <button
          onClick={() => {
            localStorage.clear();
            location.href = "/login";
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
export default function Router() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/reports" element={<HistoryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reservations" element={<ReservationsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/members" replace />} />
    </Routes>
  );
}

// const Router = () => {
//     return(
//         // <BrowserRouter>
//         //     <Routes>
//         //         <Route element={<Layout />}/>
//         //         <Route path="/members" element ={<MembersPage/>}/>
//         //         <Route path="/login" element={<Login />} />
//         //         <Route path="/register" element={<Register />} />
//         //         <Route path="/forgot-password" element={<Forgot />} />
//         //         <Route path="/dashboard" element={<DashboardPage />} />
//         //         <Route path="/account" element={<AccountPage />} />
//         //         <Route path="/loans" element={<LoansPage />} />
//         //         <Route path="/reservations" element={<ReservationsPage />} />
//         //         <Route path="/" element={<Navigate to="/dashboard" replace />}/> 
//         //         <Route path="*" element={<Navigate to="/dashboard" replace />}/>               
//         //     </Routes>
//         // </BrowserRouter>
//     )
// }

// export default Router


