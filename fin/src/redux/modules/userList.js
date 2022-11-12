import { createSlice } from '@reduxjs/toolkit'
import { deleteCookie } from '../../shared/Cookies';
import { auth } from "../../shared/firebase"
import { redirect } from "../../shared/redirect"
import firebase from "firebase/compat/app";

const initialState = {
    user: null,
    is_login: false,
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
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then((res) => {
            auth
            .signInWithEmailAndPassword(id, pwd)
            .then((user) => {
                console.log(user);

                dispatch(log_in({
                    user_name: user.user.displayName,
                    id: id,
                    user_profile: "",
                    uid: user.user.uid,
                }));
                navigate("/");
            })
        })
    }
}

export const signupFB = (id, pwd, user_name, navigate) => {
    return function (dispacth) {
        auth
        .createUserWithEmailAndPassword(id, pwd)
        .then((user) => {
            console.log(user);

            auth.currentUser.updateProfile({
                displayName: user_name,
            })
            navigate("/login");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode, errorMessage);
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