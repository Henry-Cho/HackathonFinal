import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { Button } from '../elements';
import { getTotalTransactionFB } from "../redux/modules/historyList"


export default function History(props) {
    const dispatch = useDispatch();
    const total_fund = useSelector((state) => state.history.total_fund);
    const total_transaction_list = useSelector((state) => state.history.total_transaction_list);
    const is_login = useSelector((state) => state.user.is_login);
    useEffect(() => {
        dispatch(getTotalTransactionFB());
    }, [])

    return (<>
    <h1>History</h1>
    { is_login ? <>
        <h2>Total Fund: {total_fund}</h2>
    { total_transaction_list && total_transaction_list.map((t_list, idx) => {
        return(<>
            <div>
                <h3>Username: {t_list.user_name}</h3>
                <p>Fund Type: {t_list.type}</p>
                <p>Fund Amount: {t_list.fund_amount}</p>
                <p>Fund Recorded: {t_list.created_date}</p>
            </div>
        </>);
    })}
    </> : <>
    <div>
        <h2>You are not logged in!</h2>
        <h3>To use this service, you need to log in.</h3>
        <Link to="/login">
            <Button>To Login Page</Button>
        </Link>
    </div>
    </>}
    </>)
}