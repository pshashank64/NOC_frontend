import { useEffect, useState } from "react";
import "./viewNoc.css"
import nocSerivce from "../../../services/nocService";

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
                <p style={{color: "white"}}>Loading NOC data...</p>
            ) : 
            noc ? ( 
                <table className="table table-dark table-striped table-bordered table-hover" style={{maxWidth: "45vw", marginTop: "10vh"}}>
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
                            <td>Is Approved</td>
                            <td>{noc.data.isApproved ? "true" : "false"}</td>
                        </tr>
                        <tr>
                            <th scope="row">8</th>
                            <td>HOD Approval</td>
                            <td>{noc.data.hodApproval ? "true" : "false"}</td>
                        </tr>
                        <tr>
                            <th scope="row">9</th>
                            <td>CRPC Approval</td>
                            <td>{noc.data.crpcApproval ? "true" : "false"}</td>
                        </tr>
                        <tr>
                            <th scope="row">10</th>
                            <td>Dean Approval</td>
                            <td>{noc.data.deanApproval ? "true" : "false"}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p style={{color: "white"}}>No NOC data available for this user.</p> // Display message when no NOC data is available
            )}
        </div>
    );
}

export default ViewNoc;