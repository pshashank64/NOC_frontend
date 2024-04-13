import axios from 'axios';
import studentService from './studentService';

const baseURL = 'http://localhost:8000/api/student';

const nocSerivce = {
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

            const response = await axios.post(`${baseURL}/noc/addNoc`, {userId, name, email, roll, ctc, company, joiningDate, isApproved, hodApproval, deanApproval, crpcApproval}, {withCredentials: true});

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
    }
}

export default nocSerivce;