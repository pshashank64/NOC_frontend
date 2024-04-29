import "./progressBar.css"
import axios from "axios";

function ProgressBar({ nocId, isApproved, hodApproval, crpcApproval, deanApproval, isRejected, rejectedBy }) {

    const handleDownload = async (nocId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/student/download-noc/${nocId}`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'noc.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading PDF: ', error);
        }
    }

    return (
        <div style={{ marginLeft: "5vw", marginTop: "10vh" }}>
            <div className="wrapper">
                <ul className="StepProgress">
                    <div className="StepProgress-item is-done">
                        <strong>NOC Submitted!</strong>
                    </div>
                    {
                        isRejected ? (
                            <div className="StepProgress-item is-not-done">
                                <strong style={{color:"red"}}>Rejected by {rejectedBy}</strong>
                            </div>
                        ) : 
                        (
                            <div>
                                <div className={`StepProgress-item ${hodApproval ? "is-done" : "current"}`}>
                                    <strong>HOD Approval</strong>
                                </div>
                                <div className={`StepProgress-item ${crpcApproval ? "is-done" : "current"}`}>
                                    <strong>CRPC Approval</strong>
                                </div>
                                <div className={`StepProgress-item ${deanApproval ? "is-done" : "current"}`}>
                                    <strong>Dean Approval</strong>
                                </div>
                                <div className={`StepProgress-item ${isApproved ? "is-done" : "current"}`}>
                                    <strong>NOC Approved!</strong>
                                </div>
                            </div>
                        )
                    }

                    {
                        isApproved ? (
                            <button onClick={() => handleDownload(nocId)} className="btn btn-dark" style={{marginTop: "5vh"}}>Download NOC PDF</button>
                        ) : (
                            <></>
                        )
                    }
                    
                </ul>
            </div>
        </div>
    );
}

export default ProgressBar;
