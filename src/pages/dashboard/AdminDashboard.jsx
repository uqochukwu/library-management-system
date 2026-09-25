import { Link } from "react-router";
import "./dashboard.css";


export default function AdminDashboard() {
  return (
    <>
    <div className="page dash">
      <div className="dash-head">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back. Here's your library overview.</p>
        </div>
        <Link to="/" className="outline">
          Settings
        </Link>
      </div>
      <div className="stats">
        <div>
          <b>0150</b>
          <span>Members</span>
        </div>
        <div>
          <b>01500</b>
          <span>Total Books</span>
        </div>
        <div>
          <b>0010</b>
          <span>Active Loans</span>
        </div>
      </div>
      <div className="grid">
        <section className="chart">
          <div className="pie"></div>
          <div>
            <span>● Total Borrowed Books</span>
            <span>● Total Returned Books</span>
          </div>
        </section>
        <section className="quick">
          <h3>Quick Actions</h3>
          <Link to="/account">View My Account</Link>
          <Link to="/members">View Members</Link>
        </section>
      </div>
    </div>
    </>
  );
}
