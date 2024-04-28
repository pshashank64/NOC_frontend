import { useState, useEffect } from "react";
import DeanService from "../../../services/deanService";
import "./viewAllNoc.css"

function ViewAllNoc(){
    const [NOCs, setNOCs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNOCs = async () => {
            try {
                setIsLoading(true);
                const data = await DeanService.viewAllNOCs();
                // console.log(data.data);
                setNOCs(data.data);
            } catch (error) {
                console.error('Error fetching NOCs: ', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNOCs();
    }, []);

    const handleApprovalClick = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure to approve the NOC?");
            if(!confirmed) return;

            const approvedNoc = await DeanService.approveNoc(id, "Dean");
            alert("Noc Approved");

            setNOCs(prevNOCs => {
                const updatedNOCs = prevNOCs.map(noc => {
                    if (noc._id === id) {
                        return { ...noc, deanApproval: true, isApproved: true };
                    }
                    return noc;
                });
                return updatedNOCs;
            });
        } catch (err) {
            alert("Error in approving");
        }
    }    

    const handleRejectionClick = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure to reject the NOC?");
            if(!confirmed) return;

            const rejectedNOC = await DeanService.rejectNoc(id, "Dean");
            alert("Noc Rejected!");

            setNOCs(prevNOCs => {
                const updatedNOCs = prevNOCs.map(noc => {
                    if (noc._id === id) {
                        return { ...noc, isRejected: true };
                    }
                    return noc;
                });
                return updatedNOCs;
            });
        } catch (err) {
            alert("Error in rejecting");
        }
    }

    return(
        <div className="all-students">
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                <table className="table table-dark table-striped table-bordered table-hover" style={{minWidth: "65vw", maxWidth: "70vw", marginTop: "10vh", marginLeft: "10vw"}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Roll Number</th>
                            <th>CTC</th>
                            <th>Company</th>
                            <th>Joining Date</th>
                            <th style={{textAlign: "center"}}>Approve?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {NOCs.map((noc, index) => (
                            <tr key={noc._id}>
                                <td>{index + 1}</td>
                                <td>{noc.name}</td>
                                <td>{noc.email}</td>
                                <td>{noc.roll}</td>
                                <td>{noc.ctc}</td>
                                <td>{noc.company}</td>
                                <td>{noc.joiningDate}</td>
                                <td style={{textAlign: "center"}}>
                                    {
                                        noc.isRejected ? <p style={{color:"red"}}>Rejected</p> : noc.deanApproval ? "Approved" : !noc.hodApproval ? "Waiting for HOD" : !noc.crpcApproval ? "Waiting for CRPC" :
                                        <p>
                                            <button className="btn btn-secondary approve" onClick={() => handleApprovalClick(noc._id)}><i className="fa-solid fa-check-double"></i></button>
                                            <button className="btn btn-danger" onClick={() => handleRejectionClick(noc._id)}><i className="fa-solid fa-circle-xmark"></i></button>
                                        </p>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ViewAllNoc;