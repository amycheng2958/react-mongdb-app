import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../container/login";
import Register from "../container/register";
import BossInfo from "../container/bossinfo";
import GeniusInfo from "../container/geniusinfo";
export default function Routes(props) {
    return (
        <Router>
            <Switch>
                <Route path="/bossinfo" component={BossInfo}></Route>
                <Route path="/geniusinfo" component={GeniusInfo}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
            </Switch>
        </Router>
    );
}
