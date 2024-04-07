import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginPost } from './axios/APIcalls/EventsAPI'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./Style.css"
import axios from "axios";

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const navigate = useNavigate();
    const checkUser = async () => {
        let user = {
            userName:userId,
            password:password
        }

         await axios.post("https://localhost:7256/Auth/login",{
            userName:userId,
            password:password
         }).then((response) => {
            
                    alert("Welcome to your Calendar");
                    navigate('/Calendar', { replace: false })
                

           
        }).catch((err)=>
        {
            alert("You are unknown, please sign up");
            navigate('/Register', { replace: false })
        })

    }

    return (<div className={"mainContainer"}>

        <div className={"titleContainer"}>

            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={userId}
                placeholder="Enter your name here"
                onChange={ev => setUserId(ev.target.value)}
                className={"inputBox"} />
        </div>

        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment helperText="Required field." position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={checkUser}
                value={"Log in"} />
        </div>
    </div>)

}
export default Login;