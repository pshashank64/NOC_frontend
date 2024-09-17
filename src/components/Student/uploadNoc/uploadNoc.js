import { useState } from "react";
import nocSerivce from "../../../services/nocService";

function UploadNoc({userId}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState("");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setUploadMessage("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("nocFile", selectedFile);
        formData.append("userId", userId);

        try {
            const response = await nocSerivce.uploadNoc(formData);
            console.log(response);
            setUploadMessage("File uploaded successfully!", response);
        } catch (error) {
            setUploadMessage(`Error uploading file: ${error.message}`);
            console.error(error);
        }
    };

    return (
        <div className="noc">
            {!uploadMessage &&
                <form onSubmit={handleUpload}>
                    <input type="file" onChange={handleFileChange} accept=".pdf,.docx,.jpeg,.jpg" />
                    <button type="submit">Upload NOC</button>
                </form>
            }
            {uploadMessage && <p style={{color: "white"}}>{uploadMessage}</p>}
        </div>
    );
}

export default UploadNoc;
