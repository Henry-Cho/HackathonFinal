import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getTotalFundFB } from "../redux/modules/moneyList"
import { get_goal_list } from "../redux/modules/goalList"
import FundModal from "../components/FundModal"
import { Button } from "../elements";
import styled from "styled-components";
import { useNavigate } from "react-router";
import GoalList from '../components/GoalList';
import { Link } from 'react-router-dom';

export default function Goal(props) {
    const dispatch = useDispatch();
    const total_fund = useSelector((state) => state.money.total_fund);
    const navigate = useNavigate();
    const is_login = useSelector((state) => state.user.is_login);

    const [modalOn, setModalOn] = useState(false);
    const [isAdd, setIsAdd] = useState("");
    const openModal = () => {
        if (modalOn !== true) {
            setModalOn(true);
        }
    }

    const closeModal = () => {
        if (modalOn === true) {
            setModalOn(false);
        }
    }

    const setAdd = () => {
        setIsAdd("add");
    }

    const setRemove = () => {
        setIsAdd("remove");
    }

    const gotoSetGoal = (type) => {
        let url = "/category/" + "type";
        sessionStorage.setItem("category_type", type);
        navigate(url);
    }

    useEffect(() => {
        console.log("HEHE")
        dispatch(getTotalFundFB());
        dispatch(get_goal_list());
    }, [])

    return (<>
    <h1>Goal</h1>

    {is_login ? <>
        <div>
            <p>Current Total Fund: {total_fund}</p>
        </div>
        <Button _onClick={()=> {openModal(); setAdd();}}>Add Fund</Button>
        {total_fund > 0 ? <><Button _onClick={() => {openModal(); setRemove();}}>Remove Fund</Button></> : null}
        <CategoryBox>
            <CategoryInner>
                <CategoryItem bg_color="blue" onClick={()=> gotoSetGoal("house")}>House</CategoryItem>
                <CategoryItem bg_color="red" onClick={()=> gotoSetGoal("car")}>Car</CategoryItem>
            </CategoryInner>
            <CategoryInner>
                <CategoryItem bg_color="green" onClick={()=> gotoSetGoal("school")}>School</CategoryItem>
                <CategoryItem bg_color="pink" onClick={()=> gotoSetGoal("emergency")}>Emergency</CategoryItem>
            </CategoryInner>
        </CategoryBox>
        <GoalList />
        {modalOn ? <><FundModal type={isAdd} close={closeModal} /></> : null}
    </> : <>
    <div>
        <h2>You are not logged in!</h2>
        <h3>To use this service, you need to log in.</h3>
        <Link to="/login">
            <Button>To Login Page</Button>
        </Link>
    </div>
    </>}
    </>);
}

const CategoryBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px 0;
`;

const CategoryInner = styled.div`
    display: flex;
    margin: auto;
`;

const CategoryItem = styled.div`
    width: 200px;
    height: 200px;
    line-height: 200px;
    ${(props) => (props.bg_color ? `background: ${props.bg_color};` : "")}
    cursor: pointer;
`;

