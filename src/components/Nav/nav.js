import "./nav.css";
import HodLoginService from "../../services/HodLoginService";
import { useState, useEffect } from "react";

function Nav ({ onLoginClick }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(HodLoginService.isAuthenticated()); // Update authentication status on component mount
    }, []);

    const onLogoutClick = () => {
        HodLoginService.logout();
        setIsAuthenticated(false);
    }
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark" style={{backgroundColor:"#595B83"}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                    <img src={require('./logo.png')} alt="" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        {   !isAuthenticated && 
                            <li className="nav-item">
                                <button className="nav-link" onClick={onLoginClick}>Login</button>
                            </li>
                        }
                        {
                            isAuthenticated &&
                            <li className="nav-item">
                                <button className="nav-link" onClick={onLogoutClick}>Logout</button>
                            </li>
                        }
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav;