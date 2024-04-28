import axios from 'axios';

const baseURL = 'http://localhost:8000/api/dean';

const DeanService = {

  login: async (email, password, role) => {
    try {
      const response = await axios.post(`${baseURL}/sign-in`, { email, password, role }, {withCredentials: true});

      const session  = response.data;
      console.log(session.message);

      // Save session data in local storage
      localStorage.setItem('session', session.session.sessionID);
      localStorage.setItem('user', session.session.user.name);
      localStorage.setItem('role', session.session.user.role);

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    // Remove session data from local storage on logout
    localStorage.removeItem('session');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    window.location.reload();
  },

  getSession: () => {
    // Retrieve session data from local storage
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  },

  isAuthenticated: () => {
    const session = localStorage.getItem('session');
    return session ? true : false;
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user;
  },


  viewAllNOCs: async () => {
    try {
      let data = [];
      data = await axios.get(`${baseURL}/allNOCs`, {withCredentials: true});
      // console.log(data.data);
      return data;
    } catch (error) {
      throw error.response.data;
    }
  },

  approveNoc: async (nocId, role) => {
    try {
      const data = await axios.post(`${baseURL}/noc/approve`, {nocId, role}, {withCredentials: true});
      return data;
    } catch (error) {
      throw error.response.data;
    }
  },

  rejectNoc: async (nocId, rejectedBy) => {
    try {
      const data = await axios.post(`${baseURL}/noc/reject`, {nocId, rejectedBy}, {withCredentials: true});
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
  
};

export default DeanService;
