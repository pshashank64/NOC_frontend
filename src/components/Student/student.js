import Nav from "../Nav/nav";
import Login from "../Login/Login";
import studentService from "../../services/studentService";
import defaultService from "../../services/defaultService";
import NocForm from "./nocForm/nocForm";
import ViewNoc from "./viewNoc/viewNoc";
import NotFound from "../NotFound/NotFound";
import "./student.css"

import { useEffect, useState } from "react";
import UploadNoc from "./uploadNoc/uploadNoc";
import AddLeetCodeUrl from "./AddLeetcode/addLeetcode";

function Student () {
    const [showLogin, setShowLogin] = useState(false);
    const [showNoc, setShowNoc] = useState(false);
    const [viewNoc, setViewNoc] = useState(false);
    const [viewNocUpload, setViewNocUpload] = useState(false);
    const [viewUrlUpload, setViewUrlUpload] = useState(false);
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
            setViewNocUpload(false);
            setViewUrlUpload(false);
            setRole("Student") 
        }
    };

    const handleNocClick = () => {
        setShowNoc(true);
        setShowLogin(false);
        setViewNoc(false);
        setViewNocUpload(false);
        setViewUrlUpload(false);
        setUserId(studentService.getUserId());
    }

    const handleViewNoc = () => {
        setUserId(studentService.getUserId());
        setViewNoc(true);
        setShowNoc(false);
        setShowLogin(false);
        setViewNocUpload(false);
        setViewUrlUpload(false);
    }

    const handleNocUpload = () => {
        setUserId(studentService.getUserId());
        setViewNoc(false);
        setShowNoc(false);
        setShowLogin(false);
        setViewNocUpload(true);
        setViewUrlUpload(false);
    }

    const handleUploadCodeClick = () => {
        setUserId(studentService.getUserId());
        setViewNoc(false);
        setShowNoc(false);
        setShowLogin(false);
        setViewNocUpload(false);
        setViewUrlUpload(true);
    }

    return (
        <> 
            {(defaultRole && defaultRole !== "Student") && (
                <NotFound message={"Someone else is already logged in!"} />
            )}
            
            {(!defaultRole || defaultRole === "Student" ) && (
                <>
                    <Nav onLoginClick={handleLoginClick} role="Student" onNocClick={handleNocClick} onViewNocClick={handleViewNoc} onViewNocUploadClick={handleNocUpload} onViewUploadCodeClick={handleUploadCodeClick}/>
                    {!showLogin && 
                    <div className="welcome">
                        <h3>Welcome {user ? user : "Student"}</h3><br />
                        {!isAuthenticated && <h3>Kindly Login to proceed with the services...</h3>}
                    </div>
                    }
                    {showLogin && !isAuthenticated && <Login role={role} />}
                    {showNoc && isAuthenticated && <NocForm userId={userId} />}
                    {viewNoc && isAuthenticated && <ViewNoc userId={userId} />}
                    {viewNocUpload && isAuthenticated && <UploadNoc userId={userId} />}
                    {viewUrlUpload && isAuthenticated && <AddLeetCodeUrl/>}
                </>
            )}
        </>
    )
}

export default Student;