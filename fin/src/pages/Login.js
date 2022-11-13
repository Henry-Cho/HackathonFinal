import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Input, Text } from "../elements";
import { setCookie } from "../shared/Cookies";
import { loginFB } from "../redux/modules/userList";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../shared/config.js"

const Login = (props) => {
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeId = (e) => {
        setId(e.target.value);
    }

    const changePwd = (e) => {
        setPwd(e.target.value);
    }

    const login = () => {
        console.log("DDSFS")
        if(id == "" || pwd == "")
            return;
        
        dispatch(loginFB(id, pwd, navigate))
        setId("");
        setPwd("");
        // sessionStorage.setItem("is_login", true);

    }

    return (
        <React.Fragment>
            <Grid padding={16}>
                <Text  size="32px" bold type="heading">Login</Text>
            </Grid>
            <Grid padding={16}>
                <Input label="Email" value={id} _onChange={changeId} placeholder="Please Enter User Name."/><br></br>
                <Input label="Password" type="password" value={pwd} _onChange={changePwd} placeholder="Please Enter Password."/>
            </Grid>

            <div style={{ marginTop: 30 }}>
                <Button _onClick={() => {login();}}>Login</Button>
                <Link to="/signup">
                    <Button>Signup</Button>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default Login;