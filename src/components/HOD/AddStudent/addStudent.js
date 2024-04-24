import { useState } from "react";
import hodService from "../../../services/HodService";
import "./addStudent.css"

function AddStudent({role}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roll, setRoll] = useState('');
    const [error, setError] = useState('');

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            const student = await hodService.addStudent(name, email, password, roll, role);
            alert("Student Data Added!");
            setEmail('');
            setName('');
            setPassword('');
            setRoll('');
            setError('');
        } catch (error) {
            console.log(error);
            setError(error.error);
        }
    }

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

    return (
        <div className="add-student">
            <div className="container">
                <div className="card">
                    <h2>Add Student</h2>
                    <form onSubmit={handleAddStudent}>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" placeholder="Enter the Name" required />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" placeholder="Enter the Email" required />
                        {/* <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder="Enter the Password" required /> */}
                        <div className="inp">
                            <input className="inp-cl" type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder="Password *" required />
                            <span className="inp-b"><i className="fas fa-eye-slash" onClick={togglePass}></i></span>
                        </div>
                        <input type="text" value={roll} onChange={(e) => setRoll(e.target.value)} id="roll" name="roll" placeholder="Enter the Roll No." required />
                        <button className="button-login" type="submit">Submit</button>
                        {error && <p>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddStudent;