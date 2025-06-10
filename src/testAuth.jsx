import { registerUsers, loginUser } from "./firebaseAuth";
import React, {useState} from "react";

function TestAuth(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async() =>{
        try{
            const user = await registerUsers(email, password, username);
            setMessage(`Registered: ${user.email}`);
        } catch(error){
            setMessage(`Register failed: ${error.message}`);
        }
    }
    const handleLogin = async() => {
        try{
            const user = await loginUser(email, password);
            setMessage(`Login successful: Welcome ${user.email}`);
        }catch(error){
            setMessage(`Error: ${error.message}`);
        }
    }
    return (
        <div>
            <h2>Test Firebase Authentication</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
            {message && <p>{message}</p>}
        </div>
    );
}
export default TestAuth;