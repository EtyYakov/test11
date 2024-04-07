import {useState} from "react";
import { useNavigate } from "react-router-dom";

const Enter =() => {
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const handleUserName = event => {
        setUserName(event.target.value);
    };
    const handlePassword = event => {
    setPassword(event.target.value);
    };
    
    const navigate = useNavigate();
    const enter =()=>{
            navigate("../Login", {replace:false});
            navigate("..Register", {replace:false});
    }
    return(<>
    <input placeholder="User Name" onChange={handleUserName}></input>
    <input placeholder="Password" onChange={handlePassword}></input>
    <button onClick={enter}>Enter</button>
    </>)
    
}
export default Enter;