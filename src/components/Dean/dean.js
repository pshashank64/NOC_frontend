import Nav from "../Nav/nav";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import defaultService from  "../../services/defaultService";
import ViewAllNoc from "./ViewAllNoc/viewAllNoc";
import deanService from "../../services/deanService";
import { useState, useEffect } from "react";

import './dean.css'

function Dean() {
    const [showLogin, setShowLogin] = useState(false);
    const [role, setRole] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState('');
    const [defaultRole, setDefaultRole] = useState("");
    const [viewAllNoc, setViewAllNoc] = useState(false);

    useEffect(() => {
        setIsAuthenticated(deanService.isAuthenticated()); // Update authentication status on component mount
        setUser(deanService.getUser());
        setDefaultRole(defaultService.getDefaultRole());
    }, []);

    const handleLoginClick = () => {
        if(!isAuthenticated){
            setShowLogin(true);
            setViewAllNoc(false)
            setRole("Dean") 
        }
    };

    const handleViewAllNoc = () => {
        setViewAllNoc(true);
        setShowLogin(false);
    }

    return (
        <>
            {(defaultRole && defaultRole !== "Dean") && (
                <NotFound message={"Someone else is already logged in!"} />
            )}

            {(!defaultRole || defaultRole === "Dean" ) && (
                <>
                    <Nav onLoginClick={handleLoginClick} role="Dean" onViewAllNoc={handleViewAllNoc} />
                    {!showLogin && 
                    <div className="welcome">
                        <h1>Welcome {user ? user : "Dean"}</h1>
                    </div>
                    }
                    {showLogin && <Login role={role} />}
                    {viewAllNoc && <ViewAllNoc />}
                </>
            )}
        </>
    )
    
}

export default Dean;