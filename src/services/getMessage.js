import axios from "axios";

export const getMessage = () => {
    return axios.get(`http://localhost:8000/message`);
}