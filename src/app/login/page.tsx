"use client";

import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import { useAccessToken, useSignInEmailPassword } from "@nhost/react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { login } from "@/redux/slices/auth/authSlice";
import { authRest } from "@/services/rest/auth";
import { getPets } from "@/services/rest/pets/getPets";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user: userState } = useAppSelector((state) => state.auth);

  const [loginForm, setLoginForm] = useState({
    email: "gtest@mail.com",
    password: "Gorkem3599",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginForm({ ...loginForm, [name]: value });
  };

  const onFinish = (values: any) => {
    authRest.signInEmailAndPassword(loginForm.email, loginForm.password).then((response) => {
      console.log("res", response);
      const session = response.session;
      console.log("session", session);
      dispatch(login({ user: session.user, accessToken: session.accessToken }));
    });
  };

  useEffect(() => {
    console.log("userState", userState);
    getPets();
  }, [userState]);

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
