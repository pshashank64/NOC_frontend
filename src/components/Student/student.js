import Nav from "../Nav/nav";
import Login from "../Login/Login";
import studentService from "../../services/studentService";
import defaultService from "../../services/defaultService";
import NocForm from "./nocForm/nocForm";
import ViewNoc from "./viewNoc/viewNoc";
import NotFound from "../NotFound/NotFound";
import "./student.css"

import { useEffect, useState } from "react";

function Student () {
    const [showLogin, setShowLogin] = useState(false);
    const [showNoc, setShowNoc] = useState(false);
    const [viewNoc, setViewNoc] = useState(false);
    const [role, setRole] = useState('');
    const [defaultRole, setDefaultRole] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        setIsAuthenticated(studentService.isAuthenticated());
        setUser(studentService.getUser());
        setDefaultRole(defaultService.getDefaultRole());
    }, []);

    const handleLoginClick = () => {
        if(!isAuthenticated){
            setShowLogin(true);
            setViewNoc(false);
            setShowNoc(false);
            setRole("Student") 
        }
    };

    const handleNocClick = () => {
        setShowNoc(true);
        setShowLogin(false);
        setViewNoc(false);
        setUserId(studentService.getUserId());
    }

    const handleViewNoc = () => {
        setUserId(studentService.getUserId());
        setViewNoc(true);
        setShowNoc(false);
        setShowLogin(false);
    }

    return (
        <> 
            {(defaultRole && defaultRole !== "Student") && (
                <NotFound message={"Someone else is already logged in!"} />
            )}
            
            {(!defaultRole || defaultRole === "Student" ) && (
                <>
                    <Nav onLoginClick={handleLoginClick} role="Student" onNocClick={handleNocClick} onViewNocClick={handleViewNoc} />
                    {!showLogin && 
                    <div className="welcome">
                        <h3>Welcome {user ? user : "Student"}</h3><br />
                        {!isAuthenticated && <h3>Kindly Login to proceed with the services...</h3>}
                    </div>
                    }
                    {showLogin && !isAuthenticated && <Login role={role} />}
                    {showNoc && isAuthenticated && <NocForm userId={userId} />}
                    {viewNoc && isAuthenticated && <ViewNoc userId={userId} />}
                </>
            )}
        </>
    )
}

export default Student;