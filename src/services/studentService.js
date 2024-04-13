import axios from 'axios';
import cookie from 'js-cookie';

const baseURL = 'http://localhost:8000/api/student';

const studentService = {

  login: async (email, password, role) => {
    try {
      const response = await axios.post(`${baseURL}/sign-in`, { email, password, role }, {withCredentials: true});

      const session  = response.data;
      console.log(session);

      // Save session data in local storage
      localStorage.setItem('session', session.session.sessionID);
      localStorage.setItem('user', session.session.user.name);
      localStorage.setItem('roll', session.session.user.roll);
      localStorage.setItem('userId', session.session.user.id);

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    axios.post(`${baseURL}/logout`, {}, {withCredentials: true});
    // Remove session data from local storage on logout
    localStorage.removeItem('session');
    localStorage.removeItem('user');
    localStorage.removeItem('roll');
    localStorage.removeItem('userId');
    // window.location.reload();
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

  getUserId: () => {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    return userId;
  },

  getRoll: () => {
    const roll = localStorage.getItem('roll');
    return roll;
  }
};

export default studentService;