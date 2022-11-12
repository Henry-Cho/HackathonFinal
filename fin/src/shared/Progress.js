import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";

const Progress = (props) => {
    const goal_list = useSelector((state) => state.goal.goal_list);
    const idx = props.idx;
    const goal = goal_list[idx];

    const goal_amount = goal.desired_amount;

    const goal_current_fund_list = goal.fund_list !== undefined ? goal.fund_list : [];

    console.log(goal_amount)
    console.log(goal_current_fund_list);

    const total_goal_fund = goal_current_fund_list !== undefined ? goal_current_fund_list.reduce((acc, value) => acc + value, 0) : 0;

    return (
        <ProgressBar>
        <HighLight width={(total_goal_fund / goal_amount) * 100 + "%"} />
        <Dot />
        </ProgressBar>
    );
};

const ProgressBar = styled.div`
  width: 80%;
  margin: 20px auto;
  background: #eee;
//   width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  border-radius: 10px;
`;

const HighLight = styled.div`
  background: #df402c88;
  height: 20px;
  width: ${(props) => props.width};
  transition: width 1s;
  border-radius: 10px;
`;

const Dot = styled.div`
  background: #fff;
  border: 5px solid #df402c88;
  box-sizing: border-box;
  margin: 0px 0px 0px -10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export default Progress;
