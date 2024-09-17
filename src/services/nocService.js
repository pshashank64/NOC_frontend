import axios from 'axios';
import studentService from './studentService';

const baseURL = 'http://localhost:8000/api/student';

const nocSerivce = {
    uploadNoc: async (formData) => {
        try {
            const response = await axios.post(`${baseURL}/uploadNoc`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true, // Include credentials if needed for authentication
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    downloadNoc: async (studentId) => {
        try {
            const response = await axios.get(`${baseURL}/downloadNoc/${studentId}`, {
                responseType: 'blob', // Indicates that the server's response should be treated as a binary file (blob)
                withCredentials: true, // Include credentials if needed for authentication
            });
            
            // Create a link element, set it to download the file, and trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'noc.pdf'); // Default name for the downloaded file
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            throw error.response.data;
        }
    },

    uploadLeetcodeUrl: async (codeurl) => {
        try{
            const id = studentService.getUserId();
            const leetcodeurl = codeurl;
            const student = await axios.post(`${baseURL}/addLeetcodeUrl`, {id, leetcodeurl});
            return student;
        }catch(err){
            throw err.response.data;
        }
    },
    addNoc: async (company, ctc, joiningDate, userId) => {
        try {
            const name = studentService.getUser();
            const roll = studentService.getRoll();
            const student = await axios.get(`${baseURL}/getStudent`,{params: {"id": userId}});
            const email = student.data.email;
            const isApproved = false;
            const hodApproval = false;
            const crpcApproval = false;
            const deanApproval = false;
            const isRejected = false;

            const response = await axios.post(`${baseURL}/noc/addNoc`, {userId, name, email, roll, ctc, company, joiningDate, isApproved, hodApproval, deanApproval, crpcApproval, isRejected}, {withCredentials: true});

            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getNoc: async (userId) => {
        try {
            const noc = await axios.get(`${baseURL}/noc/getNoc`,{params: {"id": userId}, withCredentials: true})
            return noc;
        } catch (error) {
            throw error.response.data;
        }
    },

    approveNoc: async (nocId) => {
        try{
            const noc = await axios.post(`${baseURL}/noc/approve`, {nocId}, {withCredentials: true});
            return noc;
        }
        catch(err){
            throw err.response.data;
        }
    }
}

export default nocSerivce;