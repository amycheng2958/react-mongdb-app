import React, { Component } from "react";
import { connect } from "react-redux";
import { createForm } from "rc-form";
import { Redirect } from "react-router-dom";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { handleLogin } from "../../store/user";
const nameRules = { required: true, message: "please input ur name" };
const passwordRules = { required: true, message: "please input ur password" };

@connect(state => state, { handleLogin })
@createForm()
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    loginClick = () => {
        const { validateFields } = this.props.form;
        const { handleLogin } = this.props;
        validateFields((error, value) => {
            if (!error) {
                handleLogin(value);
            }
        });
    };
    registerClick = () => {
        this.props.history.push("/register");
    };
    render() {
        const { getFieldDecorator, getFieldError } = this.props.form;
        return (
            <div>
                {this.props.redirectTo ? (
                    <Redirect to={this.props.redirectTo} />
                ) : null}
                <p>欢迎</p>
                <WingBlank>
                    <List>
                        {getFieldDecorator("user", { rules: [nameRules] })(
                            <InputItem type="text" placeholder="cyy" clear>
                                用户
                            </InputItem>
                        )}
                        {getFieldError("user") && (
                            <p className="error-msg">{getFieldError("user")}</p>
                        )}
                        <WhiteSpace />
                        {getFieldDecorator("pwd", {
                            rules: [passwordRules]
                        })(
                            <InputItem
                                type="password"
                                placeholder="******"
                                clear
                            >
                                密码
                            </InputItem>
                        )}
                        {getFieldError("pwd") && (
                            <p className="error-msg">{getFieldError("pwd")}</p>
                        )}
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.loginClick} type="primary">
                        登录
                    </Button>
                    <WhiteSpace />
                    <Button onClick={this.registerClick} type="primary">
                        注册
                    </Button>
                </WingBlank>
            </div>
        );
    }
}
export default Login;
