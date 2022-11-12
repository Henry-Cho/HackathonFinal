// import { useEffect, useState} from "react";
import React from 'react';
import { Button } from "../elements"
import { Link, useMatch, useResolvedPath } from "react-router-dom";
// import { getCookie, deleteCookie } from "./Cookies";
import { useDispatch, useSelector } from "react-redux";
import { logoutFB } from "../redux/modules/userList";
import { useNavigate } from "react-router-dom"
// import { apiKey } from "./firebase";

export default function Navbar() {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const navigate = useNavigate();

    if (is_login) {
        return (
            <>
            <nav className="nav">
                <Link to="/" className="site-title">Fin</Link>
                <ul>
                    <CustomLink to="/">Goal</CustomLink>
                    <CustomLink to="/goal">Dashboard</CustomLink>
                    <CustomLink to="/history">History</CustomLink>
                    <Button _onClick={() => {
                        dispatch(logoutFB(navigate));
                        }}>Logout</Button>
                </ul>
            </nav>
        </>
        )
    }
    return (
        <>
            <nav className="nav">
                <Link to="/" className="site-title">Fin</Link>
                <ul>
                    <CustomLink to="/">Home</CustomLink>
                    <CustomLink to="/goal">Goal</CustomLink>
                    <CustomLink to="/history">History</CustomLink>
                    <CustomLink to="/login">Login</CustomLink>
                </ul>
            </nav>
        </>
    );
}

function CustomLink({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <>
        <li className ={ isActive ? "active" : ""}>
            <Link to={to}>{children}</Link>
        </li>
        </>
    )
}