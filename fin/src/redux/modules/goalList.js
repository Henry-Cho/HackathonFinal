import { createSlice } from '@reduxjs/toolkit'
import { deleteCookie } from '../../shared/Cookies';
import { auth } from "../../shared/firebase"
import firebase from "firebase/compat/app";
import { firestore } from '../../shared/firebase';
import moment from "moment";
import { add_fund, remove_fund } from "./moneyList"


const initialState = {
    goal_list: [],
}

// const fund_list = firestore.collection("fund_list");
// const fund_manage = firestore.collection("fund");

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        set_goal_list: (state, action) => {
            state.goal_list = action.payload;
        },
        add_goal: (state, action) => {
            state.goal_list.push(action.payload);
        }
    },
})

export const get_goal_list = () => {
    return function (dispatch, getState) {
        dispatch(set_goal_list(getState().goal.goal_list));
    }
}

export const add_goal_list = (goal_added, navigate) => {
    return function (dispatch, getState) {
        dispatch(add_goal(goal_added))

        navigate("/goal");
        let parse_int_amount = parseFloat(goal_added.desired_amount);

        let user_info = getState().user.user;
        let curr_date = moment().format("YYYY-MM-DD hh:mm:ss");
        let removed_fund = {
            fund_amount: parse_int_amount,
            created_date: curr_date,
            type: "remove"
        }

        // dispatch(remove_fund({...user_info, ...removed_fund}))
    }
}

// Action creators are generated for each case reducer function
export const { set_goal_list, add_goal } = goalSlice.actions;

export default goalSlice.reducer