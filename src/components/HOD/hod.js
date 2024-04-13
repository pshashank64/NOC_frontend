import Nav from "../Nav/nav";
import Login from "../Login/Login";
import HodLoginService from "../../services/HodService";
import "./hod.css"

import { getMessage } from "../../services/getMessage";
import { useEffect, useState } from "react";

function Hod () {
    const [showLogin, setShowLogin] = useState(false);
    const [role, setRole] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState('');

    useEffect(() => {
        setIsAuthenticated(HodLoginService.isAuthenticated()); // Update authentication status on component mount
        setUser(HodLoginService.getUser());
    }, []);

    const handleLoginClick = () => {
        if(!isAuthenticated){
            setShowLogin(true);
            setRole("HOD") 
        }
    };

    return (
        <>
            <Nav onLoginClick={handleLoginClick} role="HOD" />
            {!showLogin && 
            <div className="welcome">
                <h1>Welcome {user ? user : "HOD"}</h1>
            </div>
            }
            {showLogin && <Login role={role} />}
        </>
    )
}

export default Hod;