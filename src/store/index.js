import { createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { user } from "./user";

const store = createStore(combineReducers({ user }), applyMiddleware(thunk));
export default store;
