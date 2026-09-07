import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import MembersPage from "./pages/members/MembersPage"
import { Login, Register, Forgot } from "./pages/auth/AuthPages"
import DashboardPage from "./pages/dashboard/DashboardPage"
import Layout from "./shared/layout/Layout"
import AccountPage from "./pages/account/AccountPage"
import LoansPage from "./pages/loans/LoansPage"


const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}/>
                <Route path="/members" element ={<MembersPage/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<Forgot />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/loans" element={<LoansPage />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />}/> 
                <Route path="*" element={<Navigate to="/dashboard" replace />}/>               
            </Routes>
        </BrowserRouter>
    )
}

export default Router


