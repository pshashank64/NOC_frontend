import { useEffect, useState } from "react";
import "./VerifyNoc.css";
import CRPCService from "../../../services/crpcService";

function VerifyNoc() {
    const [message, setMessage] = useState('');
    const [id, setId] = useState('');
    const [error, setError] = useState('');

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            setError('');
            const noc = await CRPCService.verifyNoc(id);
            setMessage(noc.data.message);
            setError(noc.error);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <div className="login" style={{marginTop: "-1vh"}}>
            <div className="container">
                <div className="card">
                    <form onSubmit={handleVerify}>
                        <input type="text" value={id} onChange={(e) => setId(e.target.value)} id="id" name="id" placeholder="Enter the NOC credential *" required/>
                        <button className="button-login" type="submit">Verify</button>
                        {error && <p>{error}</p>}
                        {message && <p style={{color: "white", marginTop: "2vh"}}>{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VerifyNoc;