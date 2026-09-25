import {Routes, Route, Navigate } from "react-router"
import MembersPage from "./pages/members/MembersPage"
import { Login, Register, Forgot } from "./pages/auth/AuthPages"
import AdminDashboard from "./pages/dashboard/AdminDashboard"
import LibrarianDashboard from "./pages/dashboard/LibrarianDashboard"
import UserDashboard from "./pages/dashboard/UserDashboard"
import Unauthorized from "./pages/Unauthorized"
import ProtectedRoute from "./shared/components/auth/ProtectedRoute"
import BooksPage from "./pages/books/BooksPage"
import CatalogPage from "./pages/catalog/CatalogPage"
import LoansPage from "./pages/loans/LoansPage"
import ReservationsPage from "./pages/loans/ReservationsPage"
import AccountPage from "./pages/account/AccountPage"
import { HistoryPage } from "./pages/reports/ReportsPage"
import Sidebar from "./shared/components/sidebar/Sidebar"
import "./index.css"




export default function Router() {
  return (
    <Routes>
      <Route element={<Sidebar />}>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute allowedRoles={["Admin"]}/>}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["Librarian"]}/>}>
          <Route path="/librarian" element={<LibrarianDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["Member"]}/>}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/reports" element={<HistoryPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

