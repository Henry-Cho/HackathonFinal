import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import goalReducer from './modules/goalList'
import userReducer from './modules/userList'
import historyReducer from './modules/historyList'
import moneyReducer from './modules/moneyList'
import { useNavigate } from  "react-router-dom"

// export const history = useNavigate();

const middlewares = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  })
];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    goal: goalReducer,
    user: userReducer,
    history: historyReducer,
    money: moneyReducer,
    // router: ConnectedRouter(history)
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: middlewares,
})