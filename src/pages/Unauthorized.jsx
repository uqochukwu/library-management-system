import { Link } from "react-router";

export default function Unauthorized() {
    return (
        <div>
            <h1>Access Denied</h1>
            <p>You do not have permission to access this page</p>
            <Link to="/login">Go to Dashboard</Link>
        </div>
    );
}