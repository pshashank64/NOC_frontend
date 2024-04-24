import Nav from "../Nav/nav";
import Login from "../Login/Login";
import HodLoginService from "../../services/HodService";
import defaultService from  "../../services/defaultService";
import ViewAllNoc from "./ViewAllNoc/viewAllNoc";
import AddStudent from "./AddStudent/addStudent";
import AllStudents from "./AllStudents/allStudents";
import NotFound from "../NotFound/NotFound";
import "./hod.css"

import { useEffect, useState } from "react";

function Hod () {
    const [showLogin, setShowLogin] = useState(false);
    const [role, setRole] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState('');
    const [defaultRole, setDefaultRole] = useState("");
    const [viewAllNoc, setViewAllNoc] = useState(false);
    const [viewAddStudent, setViewAddStudent] = useState(false);
    const [viewAllStudents, setViewAllStudents] = useState(false);

    useEffect(() => {
        setIsAuthenticated(HodLoginService.isAuthenticated()); // Update authentication status on component mount
        setUser(HodLoginService.getUser());
        setDefaultRole(defaultService.getDefaultRole());
    }, []);

    const handleLoginClick = () => {
        if(!isAuthenticated){
            setShowLogin(true);
            setViewAllNoc(false)
            setViewAddStudent(false)
            setViewAllStudents(false);
            setRole("HOD") 
        }
    };

    const handleViewAllNoc = () => {
        setViewAllNoc(true);
        setShowLogin(false);
        setViewAddStudent(false);
        setViewAllStudents(false);
    }

    const handleViewAddStudent = () => {
        setViewAddStudent(true)
        setViewAllNoc(false);
        setShowLogin(false);
        setViewAllStudents(false);
    }

    const handleViewAllStudents = () => {
        setViewAddStudent(false)
        setViewAllNoc(false);
        setShowLogin(false);
        setViewAllStudents(true);
    }

    return (
        <>
            {(defaultRole && defaultRole !== "HOD") && (
                <NotFound message={"Someone else is already logged in!"} />
            )}

            {(!defaultRole || defaultRole === "HOD" ) && (
                <>
                    <Nav onLoginClick={handleLoginClick} role="HOD" onViewAllNoc={handleViewAllNoc} onViewAddStudent={handleViewAddStudent} onViewAllStudents={handleViewAllStudents} />
                    {!showLogin && 
                    <div className="welcome">
                        <h1>Welcome {user ? user : "HOD"}</h1>
                    </div>
                    }
                    {showLogin && <Login role={role} />}
                    {viewAllNoc && <ViewAllNoc />}
                    {viewAddStudent && <AddStudent role={"Student"}/>}
                    {viewAllStudents && <AllStudents />}
                </>
            )}
        </>
    )
}

export default Hod;