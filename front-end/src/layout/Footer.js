import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <Link className="nav-link" to="/credits">
                Credits
            </Link>
        </div>
    );
}

export default Footer;