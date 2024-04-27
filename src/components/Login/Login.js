import "./Login.css";
import HodLoginService from "../../services/HodService";
import studentService from "../../services/studentService"
import { useState } from "react";
import CRPCService from "../../services/crpcService";

function Login({role}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if(role === "Student"){
                const data = await studentService.login(email, password, role);
            }
            else if(role === "HOD"){
                const data = await HodLoginService.login(email, password, role);
            }
            else if(role === "CRPC"){
                const data = await CRPCService.login(email, password, role);
            }

        
        window.location.reload();
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };


    const togglePass = () => {
        const passwordInput = document.getElementById("password");
        const icon = document.querySelector(".inp-b i");
    
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        } else {
          passwordInput.type = "password";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        }
      }


    return(
        <div className="login">
            <div class="container">
                <div class="card">
                    <h2>{role} Login</h2>
                    <form onSubmit={handleLogin}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" placeholder="Email *" required />
                        <div className="inp">
                            <input className="inp-cl" type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder="Password *" required />
                            <span className="inp-b"><i className="fas fa-eye-slash" onClick={togglePass}></i></span>
                        </div>
                        <button className="button-login" type="submit">Login</button>
                        {error && <p>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;