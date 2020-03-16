import React, { Component } from "react";
import { createForm } from "rc-form";
import {
    List,
    InputItem,
    Radio,
    WingBlank,
    WhiteSpace,
    Button
} from "antd-mobile";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";
import { handleRegister } from "../../store/user";
const nameRules = { required: true, message: "please input ur name" };
const passwordRules = { required: true, message: "please input ur password" };
const RadioItem = Radio.RadioItem;
@connect(state => state, { handleRegister })
@createForm()
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pwd: "",
            repeatpwd: "",
            type: "genius" // 或者boss
        };
    }
    submit = () => {
        const { validateFields } = this.props.form;
        const { handleRegister } = this.props;
        validateFields((error, value) => {
            if (!error) {
                handleRegister(value);
            }
        });
    };
    render() {
        const { getFieldDecorator, getFieldError } = this.props.form;
        const { type } = this.state;
        console.log(this.props);

        return (
            <div>
                {this.props.redirectTo ? (
                    <Redirect to={this.props.redirectTo} />
                ) : null}
                <WingBlank>
                    <List>
                        {getFieldDecorator("user", { rules: [nameRules] })(
                            <InputItem type="text" placeholder="cyy" clear>
                                用户名
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
                        <WhiteSpace />
                        {getFieldDecorator("confpwd", {
                            rules: [passwordRules]
                        })(
                            <InputItem
                                type="password"
                                placeholder="******"
                                clear
                            >
                                确认密码
                            </InputItem>
                        )}
                        {getFieldError("confpwd") && (
                            <p className="error-msg">
                                {getFieldError("confpwd")}
                            </p>
                        )}
                        <RadioItem
                            checked={type === "genius"}
                            onChange={() => this.setState({ type: "genius" })}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem
                            checked={type === "boss"}
                            onChange={() => this.setState({ type: "boss" })}
                        >
                            BOSS
                        </RadioItem>
                        <Button onClick={this.submit} type="primary">
                            确定
                        </Button>
                    </List>
                    <WhiteSpace />
                </WingBlank>
            </div>
        );
    }
}
export default Register;
