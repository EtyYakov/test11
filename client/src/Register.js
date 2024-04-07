import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {RegisterPost} from './axios/APIcalls/EventsAPI'
const Register =() => {
const [Registered, setRegistered] = useState('')

    const [userID, setuserID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const handleuserID = event => {
        setuserID(event.target.value);
    };
    const handleFirstName = event => {
    setFirstName(event.target.value);
    };
    const handleLastName = event => {
    setLastName(event.target.value);
    };
    const handleEmail = event => {
    setEmail(event.target.value);
    };
    const handlePhone = event => {
    setPhone(event.target.value);
    };
    const handlePassword = event => {
    setPassword(event.target.value);
    };
    
    const navigate = useNavigate();
    const register = () => {
        const user={userID,firstName,lastName,email,phone,password}
        setRegistered({...user})
        RegisterPost(user)
        navigate("/Login", {replace:false});
    }
    return(<>
    <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Register</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={userID}
                placeholder="Enter your id here"
                onChange={handleuserID}
                className={"inputBox"} />
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={firstName}
                placeholder="Enter your First Name here"
                onChange={handleFirstName}
                className={"inputBox"} />
        </div>
        <br/>
        <div className={"inputContainer"}>
            <input
                value={lastName}
                placeholder="Enter your Last Name here"
                onChange={handleLastName}
                className={"inputBox"} />
        </div>
        <br/>
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your Email here"
                onChange={handleEmail}
                className={"inputBox"} />
        </div>
        <br/>
        <div className={"inputContainer"}>
            <input
                value={phone}
                placeholder="Enter your Phone here"
                onChange={handlePhone}
                className={"inputBox"} />
        </div>
        <br/>
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter Password here"
                onChange={handlePassword}
                className={"inputBox"} />
        </div>
        <br/>
        <div className={"inputContainer"}>
            <input 
                className={"inputButton"} 
                type="button"
                onClick={register}
                value={"Register"} />
        </div>
</div>
    </>)
    
}
export default Register;