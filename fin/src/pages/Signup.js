import React, { useState } from "react";
import { Grid, Text, Input, Button } from "../elements";

import { useDispatch } from "react-redux";
import { signupFB } from "../redux/modules/userList";
import { useNavigate } from "react-router-dom"
import { config } from "../shared/config.js"
import axios from "axios";

const Signup = (props) => {
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwd_check, setPwdCheck] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const signup = () => {
        if (id === "" || pwd === "" || email == "")
            return;

        if (pwd !== pwd_check)
            return;

        dispatch(signupFB(id, email, pwd, navigate));
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text size="32px" bold>
                    Sign Up
                </Text>

                <Grid padding="16px 0px">
                    <Input
                        value = {id}
                        label="User Name"
                        placeholder="Please Type User Name."
                        _onChange={(e) => {
                            setId(e.target.value);
                        }}
                    />
                </Grid>

                <Grid padding="16px 0px">
                    <Input
                        value = {email}
                        label="Email"
                        placeholder="Type your Email"
                        _onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </Grid>

                <Grid padding="16px 0px">
                    <Input
                        value={pwd}
                        label="Password"
                        placeholder="Please Type Password"
                        _onChange={(e) => {
                            setPwd(e.target.value)
                        }}
                    />
                </Grid>

                <Grid padding="16px 0px">
                    <Input
                        value={pwd_check}
                        label="Confirm Password"
                        placeholder="Please Confirm Password"
                        _onChange={(e) => {
                            setPwdCheck(e.target.value)
                        }}
                    />
                </Grid>

                <Button _onClick={signup}>SignUp</Button>
            </Grid>
        </React.Fragment>
    );
};

Signup.defaultProps = {};

export default Signup;