import { useState } from "react";
import nocService from "../../../services/nocService"
import "./addLeetcode.css"

function AddLeetCodeUrl() {
    
    const [codeurl, setcodeurl] = useState('');
    const [uploadMessage, setUploadMessage] = useState("");
    const [error, setError] = useState(null);

    const handleUrlUpload = async (e) => {
        e.preventDefault();
        try {
            const data = await nocService.uploadLeetcodeUrl(codeurl);
            console.log(data);
            setcodeurl('');
            setError(null);
            setUploadMessage("URL uploaded successfully!", data);
        } catch (error) {
            setUploadMessage(`Error uploading url: ${error.message}`);
            console.error(error);
        }
    };
    
    return(
        <div className="noc">
            {!uploadMessage &&
                <form onSubmit={handleUrlUpload}>
                    <input type="text"  value={codeurl} onChange={(e) => setcodeurl(e.target.value)} id="url" name="codeurl" placeholder="Enter the LeetcodeUrl" required />
                    <button type="submit">Add URL</button>
                </form>
            }
            {uploadMessage && <p style={{color: "white"}}>{uploadMessage}</p>}
            {error && <p style={{color: "white"}}>{error}</p>}
        </div>
    )
}

export default AddLeetCodeUrl;