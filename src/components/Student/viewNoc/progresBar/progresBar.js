import "./progressBar.css"

function ProgressBar({ isApproved, hodApproval, crpcApproval, deanApproval, isRejected, rejectedBy }) {
    return (
        <div style={{ marginLeft: "5vw", marginTop: "15vh" }}>
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
                    
                </ul>
            </div>
        </div>
    );
}

export default ProgressBar;
