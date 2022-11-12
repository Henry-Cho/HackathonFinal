//import { useState, useEffect } from "react"
import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../elements";

export default function Home(props) {
    const is_login = useSelector((state) => state.user.is_login);
    const user_name = useSelector((state) => state.user.user?.username);
    return (<>
    <h1>Home</h1>
    {is_login ? <>Hi {user_name}</> : <></>}
    <div>
    <br></br>
    </div>
    <Link to="/goal">
        <Button>Let's Set a Goal!</Button>
    </Link>
    </>);
}