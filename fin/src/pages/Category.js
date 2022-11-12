import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Input } from "../elements";
import { add_goal_list } from "../redux/modules/goalList"; 

export default function Category(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let category_type = sessionStorage.getItem("category_type");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }

    const changeAmount = (e) => {
        setAmount(e.target.value);
    }

    const changeDate = (e) => {
        setDate(e.target.value);
    }

    const addGoal = () => {
        dispatch(add_goal_list({goal_type: category_type, goal_title: title, desired_amount: amount, desired_date: date }, navigate));
    }
    return (<>
        <h1>Category: {category_type}</h1>
        <div>
            <h2>Let's set a goal</h2>
            <Input value={title} _onChange={changeTitle} label="Goal Title" placeholder="Specify Your Goal"/>
            <Input type="number" _onChange={changeAmount} label="Desired Amount" value={amount}/>
            <Input type="date" _onChange={changeDate} label="Desired Date" value={date}/>
        </div>
        <Button _onClick={addGoal}>Set this Goal</Button>
    </>);
}