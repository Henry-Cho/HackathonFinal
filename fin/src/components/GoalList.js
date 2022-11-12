import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Progress from "../shared/Progress";

export default function GoalList (props) {
    const dispatch = useDispatch();
    const goal_list = useSelector((state) => state.goal.goal_list);
    const [goalType, setGoalType] = useState("");

    return(
        <>
        {goal_list?.length > 0 ? <>
        <GoalBox>
            <GoalFilterBox>
                <GoalFilterBtn onClick={() => {setGoalType("")}}>All</GoalFilterBtn>
                <GoalFilterBtn onClick={() => {setGoalType("house")}}>house</GoalFilterBtn>
                <GoalFilterBtn onClick={() => {setGoalType("car")}}>car</GoalFilterBtn>
                <GoalFilterBtn onClick={() => {setGoalType("school")}}>school</GoalFilterBtn>
                <GoalFilterBtn onClick={() => {setGoalType("emergency")}}>emergency</GoalFilterBtn>
            </GoalFilterBox>
            {goalType !== "" ? <>
            {goal_list?.map((goal, idx) => {
                if (goal.goal_type === goalType) {
                    return (<div>
                        <h3>Goal Type: {goal.goal_type}</h3>
                        <p>Goal Title: {goal.goal_title}</p>
                        <p>Goal Amount: {goal.desired_amount}</p>
                        <p>Desired Date: {goal.desired_date}</p>
                        <p></p>
                        <Progress idx={idx}/>
                        </div>)
                }
            })}
            </> : <>
            {goal_list?.map((goal, idx) => {
                    return (<div>
                        <h3>Goal Type: {goal.goal_type}</h3>
                        <p>Goal Title: {goal.goal_title}</p>
                        <p>Goal Amount: {goal.desired_amount}</p>
                        <p>Desired Date: {goal.desired_date}</p>
                        <p></p>
                        <Progress idx={idx}/>
                        </div>)
            })}
            </>}
        </GoalBox></> : 
        <></>}
        </>)
}

const GoalBox = styled.div`
    width: 100%;
`;

const GoalInner = styled.div`
    width: 100%;
`;

const GoalItem = styled.div`
    background: gray;
`;

const GoalFilterBox = styled.div``;

const GoalFilterBtn = styled.button``;