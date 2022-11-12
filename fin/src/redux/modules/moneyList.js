import { createSlice } from '@reduxjs/toolkit'
import { deleteCookie } from '../../shared/Cookies';
import { auth } from "../../shared/firebase"
import firebase from "firebase/compat/app";
import { firestore } from '../../shared/firebase';
import moment from "moment";


const initialState = {
    total_fund: 0,
    transaction_list: [],
}

const fund_list = firestore.collection("fund_list");
const fund_manage = firestore.collection("fund");

export const moneySlice = createSlice({
    name: 'money',
    initialState,
    reducers: {
        add_fund: (state, action) => {
            state.total_fund += action.payload.fund_amount;
            state.transaction_list.push(action.payload);
        },
        remove_fund: (state, action) => {
            state.total_fund += action.payload.fund_amount;
            state.transaction_list.push(action.payload);
            // let fund_to_be_removed = action.payload.fund_id;
            // let idx_removed = state.transaction_list.findIndex((f) => f.fund_id == fund_to_be_removed);
            // state.total_fund -= state.transaction_list[idx_removed].fund_amount;
            // state.transaction_list.splice(idx_removed, 1);
        },
        set_fund: (state, action) => {
            state.total_fund = action.payload;
        },
        set_transaction: (state, action) => {
            state.transaction_list = action.payload;
        }
    },
})

export const getTotalFundFB = () => {
    return function (dispatch) {
        console.log("HIHI")
        fund_manage
        .doc("fund_manage")
        .get()
        .then((doc) => {
                dispatch(set_fund(doc.data().total_fund));
        })

        fund_list
        .get()
        .then((docs) => {
            let t_list = [];
            docs.forEach((doc) => {
                t_list.push(doc.data());
            })
            dispatch(set_transaction(t_list));
        })
        .catch((err) => console.log(err));
    }
}

export const addFundFB = (amount) => {
    return function (dispatch, getState) {
        const fund_list = firestore.collection("fund_list");
        let curr_date = moment().format("YYYY-MM-DD hh:mm:ss");
        let parse_int_amount = parseFloat(amount);
        let added_fund = {
            fund_amount: parse_int_amount,
            created_date: curr_date,
        }

        let user_info = getState().user.user;

        fund_list
        .add({...added_fund, ...user_info, type: "add"})
        .then((doc) => {
            let add_item = {...added_fund, ...user_info, fund_id: doc.id, type: "add"}
            dispatch(add_fund(add_item));

            fund_manage.doc("fund_manage").update({
                total_fund: firebase.firestore.FieldValue.increment(parse_int_amount)
            })
        })
    }
}

export const removeFundFB = (amount) => {
    return function (dispatch, getState) {
        let parse_int_amount = parseFloat(-amount);

        console.log(parse_int_amount)
        fund_manage.doc("fund_manage").update({
            total_fund: firebase.firestore.FieldValue.increment(parse_int_amount)
        })

        let user_info = getState().user.user;
        let curr_date = moment().format("YYYY-MM-DD hh:mm:ss");
        let removed_fund = {
            fund_amount: parse_int_amount,
            created_date: curr_date,
        }

        fund_list
        .add({...removed_fund, ...user_info, type: "remove"})
        .then((doc) => {
            let remove_item = {...removed_fund, ...user_info, fund_id: doc.id, type: "remove"}
            dispatch(remove_fund(remove_item))});
    }
}

// Action creators are generated for each case reducer function
export const { add_fund, remove_fund, set_fund, set_transaction } = moneySlice.actions;

export default moneySlice.reducer