import { Link } from "react-router-dom"; // Import Link for navigation
function ErrorPage() {
    return (
        <div className="center-screen">
            <h1>Page Not Found</h1>
            <h2>Oops! We are sorry this page does not exist. Please return back to your previous page or the Dashboard.</h2>
            <Link to="/dashboard" className="button">Return To Dashboard</Link>
        </div>
    );
}
export default ErrorPage;