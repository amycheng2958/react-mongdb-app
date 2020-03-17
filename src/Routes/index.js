import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../container/login";
import Register from "../container/register";
import BossInfo from "../container/bossinfo";
import GeniusInfo from "../container/geniusinfo";
import Authroute from "../component/authroute";
export default function Routes(props) {
    return (
        <Router>
            <div>
                <Authroute></Authroute>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                </Switch>
            </div>
        </Router>
    );
}
