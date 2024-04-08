import "./Login.css";
import HodLoginService from "../../services/HodLoginService";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

function Login({role}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const data = await HodLoginService.login(email, password, role);
        window.location.reload();
        // Handle successful login
        } catch (error) {
        // Handle login error
        console.error(error);
        setError(error.message);
        }
    };
    return(
        <div className="login">
            <div class="container">
                <div class="card">
                    <h2>{role} Login</h2>
                    <form onSubmit={handleLogin}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" placeholder="Email" required />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder="Password" required />
                        <button type="submit">Login</button>
                        {error && <p>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;