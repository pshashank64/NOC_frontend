import axios from 'axios';

const baseURL = 'http://localhost:8000/api/hod';

const HodLoginService = {

  login: async (email, password, role) => {
    try {
      const response = await axios.post(`${baseURL}/sign-in`, { email, password, role });

      const session  = response.data;
      console.log(session.message);

      // Save session data in local storage
      localStorage.setItem('session', session.session.sessionID);
      localStorage.setItem('user', session.session.user.name);

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    // Remove session data from local storage on logout
    localStorage.removeItem('session');
    localStorage.removeItem('user');
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
  }
};

export default HodLoginService;
