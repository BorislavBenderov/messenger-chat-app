import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found-info">
                <h2>404.That's an error.</h2>
                <p>The requested page was not found on this server.</p>
                <Link to="/" className="go-home">Go Home</Link>
            </div>
        </div>
    );
}