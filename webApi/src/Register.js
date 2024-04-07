import {useState} from "react";
import { Await, useActionData, useNavigate } from "react-router-dom";
import {RegisterPost} from './axios/APIcalls/EventsAPI'
import axios from "axios";
const Register =() => {
const [Registered, setRegistered] = useState('')

    const [userName, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
 
    const handleusername = event => {
    setuserName(event.target.value);
    };
    const handlePassword = event => {
        setPassword(event.target.value);
        };

        const handleemail = event => {
            setEmail(event.target.value);
            };
            const handlephone = event => {
                setPhone(event.target.value);
                };
    // "username": "string",
    // "passwordHash": "string",
    // "isAdmin": true,
    
    const navigate = useNavigate();
    const register =async () => {
        const user={username:userName,password,email,phone}
        setRegistered({...user})

        await axios.post("https://localhost:7256/Auth",user).then((res)=>
        {
            alert("register successfuly")
            navigate("/Login", {replace:false});

        })
    }
    return(<>
    <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Register</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={userName}
                placeholder="Enter your username here"
                onChange={handleusername}
                className={"inputBox"} />
        </div>
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={handlePassword}
                className={"inputBox"} />
        </div>

        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your password here"
                onChange={handleemail}
                className={"inputBox"} />
        </div>

        <div className={"inputContainer"}>
            <input
                value={phone}
                placeholder="Enter your password here"
                onChange={handlephone}
                className={"inputBox"} />
        </div>
        <button onClick={register}>אישור</button>
        
</div>
    </>)
    
}
export default Register;