import { createSlice } from '@reduxjs/toolkit'
import { deleteCookie, getCookie, setCookie } from '../../shared/Cookies';
import { auth } from "../../shared/firebase"
import { redirect } from "../../shared/redirect"
import firebase from "firebase/compat/app";
import axios from "axios";
import { config } from "../../shared/config"

const initialState = {
    user: null,
    is_login: false,
}

axios.defaults.baseURL = config.api;
if (getCookie("is_login")) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
    "is_login"
  )}`;
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        log_in: (state, action) => {
            state.user = action.payload;
            state.is_login = true;
        },
        log_out: (state) => {
        deleteCookie("is_login");  
        state.user= null;
        state.is_login = false;
        },
        get_user: (state, action) => {

        },
  },
})

export const logoutAction = () => {
    return function (dispatch) {
        dispatch(log_out());
    }
}

export const loginFB = (id, pwd, navigate) => {
    return function (dispatch) {
      axios.post(config.api + '/api/login', {
        user: id,
        password: pwd
    }).then(response => {
        console.log(response);
        if(response.data.data.error) {
            console.log(response.data.data.error);
            return;
        }
        setCookie("is_login", response.data.data.authtoken)
        setCookie("user_id", response.data.data.username, 3);
        dispatch(log_in(response.data.data))
        navigate("/");
    }).catch(error => {
        console.error(error);
    });
    }
}

export const signupFB = (id, email, pwd, navigate) => {
    return function (dispacth) {
      axios.post(config.api + '/api/register', {
        username: id,
        email: email,
        password: pwd
    })
    .then(response => {
        console.log(response);
        if(response.data.data.error) {
            console.log(response.data.data.error);
            return;
        }
        
        navigate("/login");
    })
    .catch(error => {
        console.error(error);
    });
    }
}

export const loginCheckFB = () => {
    return function (dispatch){
      auth.onAuthStateChanged((user) => {
        if(user){
          dispatch(
            log_in({
              user_name: user.displayName,
              user_profile: "",
              id: user.email,
              uid: user.uid,
            })
          );
        }else{
          dispatch(log_out());
        }
      })
    }
  }
  
export const logoutFB = (navigate) => {
    return function (dispatch) {
      auth.signOut().then(() => {
        dispatch(log_out());
        navigate('/');
      })
    }
  }

// Action creators are generated for each case reducer function
export const { log_in, log_out, get_user } = userSlice.actions;

export default userSlice.reducer