import { createSlice } from '@reduxjs/toolkit'
import { deleteCookie } from '../../shared/Cookies';
import { auth } from "../../shared/firebase"
import firebase from "firebase/compat/app";
import { firestore } from '../../shared/firebase';
import moment from "moment";


const initialState = {
    total_fund: 0,
    total_transaction_list: [],
}

const fund_list = firestore.collection("fund_list");
const fund_manage = firestore.collection("fund");

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        set_list: (state, action) => {
            state.total_transaction_list = action.payload;
        },
        set_fund: (state, action) => {
            state.total_fund = action.payload;
        }
    },
})

export const getTotalTransactionFB = () => {
    return function (dispatch) {
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

            t_list = t_list.sort((a, b) => Date.parse(b.created_date) - Date.parse(a.created_date));

            dispatch(set_list(t_list));
        })
        .catch((err) => console.log(err));
    }
}

// Action creators are generated for each case reducer function
export const { set_list, set_fund } = historySlice.actions;

export default historySlice.reducer