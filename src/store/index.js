import { createStore, compose } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { user } from "./user";

const store = createStore(combineReducers({ user }), compose(applyMiddleware(thunk),window.devToolsExtension ? window.devToolsExtension() : f => f));
export default store;
