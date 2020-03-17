import { Component } from "react";
import axios from 'axios'
import { withRouter } from "react-router-dom";
import { loadData } from "../../store/user";
import { connect } from "react-redux";

@withRouter
@connect(null, { loadData })
class Authroute extends Component {
    componentDidMount() {
        const publicList = ["/login", "/register"];
        const { pathname } = this.props.location;
        if (publicList.indexOf(pathname) > -1) {
            return null;
        }
        axios.get("/user/info").then(res => {
			console.log(res,888);
			
            if (res.status === 200) {
                if (res.data.code === 0) {
                    // 有登录信息de
                    this.props.loadData(res.data.data);
                } else {
                    this.props.history.push("/login");
                }
            }
        });
    }
    render() {
        return null;
    }
}
export default Authroute;
