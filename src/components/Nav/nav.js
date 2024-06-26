import "./nav.css";
import HodLoginService from "../../services/HodService";
import studentService from "../../services/studentService";
import { useState, useEffect } from "react";

function Nav ({ onLoginClick, role, onNocClick, onViewNocClick, onViewAllNoc, onViewAddStudent, onViewAllStudents }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(HodLoginService.isAuthenticated()) || setIsAuthenticated(studentService.isAuthenticated())
    }, []);

    const onLogoutClick = () => {
        if(role === "HOD"){
            HodLoginService.logout()
        }
        else if(role === "Student"){
            studentService.logout();
        }
        setIsAuthenticated(false);
    }
    return (
        <div>
            <nav id="sidebarMenu" className="navbar right navbar-expand-lg sidebar" style={{backgroundColor: "#37474f"}}>
                <div className="sidebar-sticky">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="navbarNav" className="collapse navbar-collapse list-group list-group-flush mx-3 mt-4">
                        <a className="navbar-brand" href="/">
                            <img src={require('./logo.png')} alt="" />
                        </a>
                        <a href="/" className="btn btn-dark" aria-current="true">
                            <i className="fa-solid fa-house me-3"></i><span>Home</span>
                        </a>
                        {
                            !isAuthenticated &&
                            <a onClick={onLoginClick} className="btn btn-dark">
                                <i className="fa-solid fa-right-to-bracket me-3"></i><span>Login</span>
                            </a>
                        }
                        {
                            isAuthenticated && role==="Student" &&
                            <a onClick={onNocClick} className="btn btn-dark">
                                <i className="fa-solid fa-right-to-bracket me-3"></i><span>Request NOC</span>
                            </a>
                        }
                        {
                            isAuthenticated && role==="Student" &&
                            <a onClick={onViewNocClick} className="btn btn-dark">
                                <i className="fa-solid fa-eye me-3"></i><span>View NOC Status</span>
                            </a>
                        }
                        
                        {
                            isAuthenticated && role==="HOD" &&
                            <a onClick={onViewAllNoc} className="btn btn-dark">
                                <i className="fa-solid fa-right-to-bracket me-3"></i><span>View NOCs Request</span>
                            </a>
                        }
                        {
                            isAuthenticated && role==="HOD" &&
                            <a onClick={onViewAddStudent} className="btn btn-dark">
                                <i className="fa-solid fa-right-to-bracket me-3"></i><span>Add Student</span>
                            </a>
                        }
                        {
                            isAuthenticated && role==="HOD" &&
                            <a onClick={onViewAllStudents} className="btn btn-dark">
                                <i className="fa-solid fa-right-to-bracket me-3"></i><span>View All Students</span>
                            </a>
                        }




                        {
                            isAuthenticated &&
                            <a onClick={onLogoutClick} className="btn btn-dark">
                                <i className="fa-solid fa-circle-xmark me-3"></i><span>Logout</span>
                            </a>
                        }
                        
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav;