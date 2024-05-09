import Nav from "../Nav/nav";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import defaultService from  "../../services/defaultService";
import ViewAllNoc from "./ViewAllNoc/viewAllNoc";
import VerifyNoc from "./VerifyNOC/VerifyNoc";
import crpcService from "../../services/crpcService";
import { useState, useEffect } from "react";

import './crpc.css'

function CRPC() {
    const [showLogin, setShowLogin] = useState(false);
    const [role, setRole] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState('');
    const [defaultRole, setDefaultRole] = useState("");
    const [viewAllNoc, setViewAllNoc] = useState(false);
    const [verifyNoc, setVerifyNoc] = useState(false);

    useEffect(() => {
        setIsAuthenticated(crpcService.isAuthenticated()); // Update authentication status on component mount
        setUser(crpcService.getUser());
        setDefaultRole(defaultService.getDefaultRole());
    }, []);

    const handleLoginClick = () => {
        if(!isAuthenticated){
            setShowLogin(true);
            setViewAllNoc(false)
            setVerifyNoc(false);
            setRole("CRPC") 
        }
    };

    const handleViewAllNoc = () => {
        setViewAllNoc(true);
        setShowLogin(false);
        setVerifyNoc(false);
    }

    const handleVerifyNoc = () => {
        setVerifyNoc(true);
        setShowLogin(false);
        setViewAllNoc(false);
    }

    return (
        <>
            {(defaultRole && defaultRole !== "CRPC") && (
                <NotFound message={"Someone else is already logged in!"} />
            )}

            {(!defaultRole || defaultRole === "CRPC" ) && (
                <>
                    <Nav onLoginClick={handleLoginClick} role="CRPC" onViewAllNoc={handleViewAllNoc} onVerifyNoc={handleVerifyNoc}  />
                    {!showLogin && 
                    <div className="welcome">
                        <h1>Welcome {user ? user : "CRPC"}</h1>
                    </div>
                    }
                    {showLogin && <Login role={role} />}
                    {viewAllNoc && <ViewAllNoc />}
                    {verifyNoc && <VerifyNoc />}
                </>
            )}
        </>
    )
    
}

export default CRPC;