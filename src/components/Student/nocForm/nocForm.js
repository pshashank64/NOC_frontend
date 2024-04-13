import { useState } from "react";
import nocService from "../../../services/nocService"
import "./nocForm.css"

function NocForm({userId}) {
    const [nocSubmitted, setNocSubmitted] = useState(false);
    const [nocData, setNocData] = useState(null);
    const [company, setCompany] = useState('');
    const [ctc, setCtc] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const [error, setError] = useState(null);

    const handleNoc = async (e) => {
        e.preventDefault();
        try {
            const data = await nocService.addNoc(company, ctc, joiningDate, userId);
            setNocData(data);
            setNocSubmitted(true);
            setCompany('');
            setCtc('');
            setJoiningDate('');
            setError(null);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };
    
    return(
        <div className="noc">
            {
                !nocSubmitted && (
                <div class="container">
                <div class="card">
                    <h2>Request NOC</h2>
                    <form onSubmit={handleNoc}>
                        <input type="text" value={ctc} onChange={(e) => setCtc(e.target.value)} id="ctc" name="ctc" placeholder="Enter the CTC" required />
                        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} id="company" name="company" placeholder="Comapny Name" required />
                        <label>Joining Date</label>
                        <input type="date" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} id="joiningDate" name="joiningDate" />
                        <button type="submit">Submit</button>
                        {error && <p>{error}</p>}
                    </form>
                </div>
                </div>)
            }
            
            {nocData && (
                <diV>
                    <h1>NOC submitted successfuly!</h1>
                    <h3>You can view the status from the View NOC status button!</h3>
                </diV>
            )}
        </div>
    )
}

export default NocForm;