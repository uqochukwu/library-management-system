import { Link } from "react-router";
import "./dashboard.css";


export default function UserDashboard() {
  return (
    <>
    <div className="page dash">
      <div className="dash-head">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back. Here's your library overview.</p>
        </div>
        <Link to="/account" className="outline">
          My Account
        </Link>
      </div>
      <div className="stats">
        <div>
          <b>Your Borrowed Book List</b>
        </div>
        <div>
          <b>Your Returned Book List</b>
        </div>
        <div>
          <b>Browse available book inventory</b>
        </div>
      </div>
      <div className="grid">
        <section className="quote">
          <strong>
            “Embarking on the journey of reading fosters personal growth,
            nurturing a path towards excellence and the refinement of
            character.”
          </strong>
          <small>— LMS Team</small>
        </section>
        <section className="chart">
          <div className="pie"></div>
          <div>
            <span>● Total Borrowed Books</span>
            <span>● Total Returned Books</span>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}
