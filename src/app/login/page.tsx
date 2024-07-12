"use client";

import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { login } from "@/redux/slices/auth/authSlice";
import { restServices } from "@/services";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  // const { user: userState } = useAppSelector((state) => state.auth);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const onFinish = (values: any) => {
    restServices.auth.signinEmailPassword(loginForm.email, loginForm.password).then((response) => {
      console.log("response", response);
    });
  };

  // useEffect(() => {
  //   console.log("userState", userState);
  // }, [userState]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card title="Login" className="w-96">
        <div className="max-w-[300px] overflow-scroll">
          {/* <span className="text-xs font-semibold">isAuthenticated: {accessToken ? accessToken : "false"}</span> */}
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            email: loginForm.email,
            password: loginForm.password,
          }}
          onFinish={onFinish}
        >
          <Form.Item name="email" rules={[{ required: true, message: "Please input your Email!" }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              name="email"
              value={loginForm.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              value={loginForm.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
