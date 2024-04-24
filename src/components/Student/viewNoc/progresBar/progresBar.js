import "./progressBar.css"

function ProgressBar({ isApproved, hodApproval, crpcApproval, deanApproval }) {
    return (
        <div style={{ marginLeft: "5vw", marginTop: "15vh" }}>
            <div className="wrapper">
                <ul className="StepProgress">
                    <div className="StepProgress-item is-done">
                        <strong>NOC Submitted!</strong>
                    </div>
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
                </ul>
            </div>
        </div>
    );
}

export default ProgressBar;
