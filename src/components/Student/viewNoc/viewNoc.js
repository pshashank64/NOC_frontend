import { useEffect, useState } from "react";
import "./viewNoc.css"
import nocSerivce from "../../../services/nocService";
import ProgressBar from "./progresBar/progresBar";

function ViewNoc({userId}) {
    const [noc, setNoc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNoc = async () => {
            try {
                setIsLoading(true);
                const data = await nocSerivce.getNoc(userId);
                setNoc(data);
            } catch (error) {
                console.error('Error fetching NOC data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNoc();
    }, [userId]);

    return (
        <div className="noc-data">
            
            {isLoading ? (
                <div className="loader"></div>
                // <p style={{color: "white"}}>Loading NOC data...</p>
            ) : 
            noc ? ( 
                <div className="noc-details">
                    <table className="table table-dark table-striped table-bordered table-hover" style={{minWidth: "45vw", maxWidth: "45vw", marginTop: "10vh", marginLeft: "10vw"}}>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Name</td>
                                <td>{noc.data.name}</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Email</td>
                                <td>{noc.data.email}</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Roll No.</td>
                                <td>{noc.data.roll}</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Company</td>
                                <td>{noc.data.company}</td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>CTC</td>
                                <td>{noc.data.ctc}</td>
                            </tr>
                            <tr>
                                <th scope="row">6</th>
                                <td>Joining Date</td>
                                <td>{noc.data.joiningDate}</td>
                            </tr>
                            <tr>
                                <th scope="row">7</th>
                                <td>HOD Approval</td>
                                <td>{noc.data.hodApproval ? "Approved" : "Waiting for Approval !"}</td>
                            </tr>
                            <tr>
                                <th scope="row">8</th>
                                <td>CRPC Approval</td>
                                <td>{noc.data.crpcApproval ? "Approved" : "Waiting for Approval !"}</td>
                            </tr>
                            <tr>
                                <th scope="row">9</th>
                                <td>Dean Approval</td>
                                <td>{noc.data.deanApproval ? "Approved" : "Waiting for Approval !"}</td>
                            </tr>
                            <tr>
                                <th scope="row">10</th>
                                <td>Is Approved</td>
                                <td>{noc.data.isApproved ? "Approved" : "Waiting for Approval !"}</td>
                            </tr>
                        </tbody>
                    </table>

                    <ProgressBar
                        isApproved={noc.data.isApproved}
                        hodApproval={noc.data.hodApproval}
                        crpcApproval={noc.data.crpcApproval}
                        deanApproval={noc.data.deanApproval}
                        isRejected={noc.data.isRejected}
                        rejectedBy={noc.data.rejectedBy}
                        nocId={noc.data._id}
                        ctc = {noc.data.ctc}
                    />
                </div>
            ) : (
                <p style={{color: "white"}}>No NOC data available for this user.</p> // Display message when no NOC data is available
            )}
        </div>
    );
}

export default ViewNoc;