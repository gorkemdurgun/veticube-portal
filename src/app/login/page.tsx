"use client";

import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, message } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { restServices } from "@/services";
import { useMutation, useQuery } from "react-query";
import { login } from "@/redux/slices/auth/authSlice";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user: userState, accessToken } = useAppSelector((state) => state.auth);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const {
    mutate: loginMutation,
    data: response,
    error,
    isError,
    isSuccess,
  } = useMutation(() => restServices.auth.signinEmailPassword(loginForm.email, loginForm.password));

  useEffect(() => {
    if (isSuccess) {
      message.success("Login success");
      dispatch(
        login({
          user: {
            id: response.data.session.user.id,
            email: response.data.session.user.email,
          },
          accessToken: response.data.session.accessToken,
        })
      );
    } else if (isError) {
      let errorMessage = error as string;
      message.warning(errorMessage + " Please check your email for verification link.");
    }
  }, [isSuccess, isError, response, error]);

  useEffect(() => {
    console.log("userState", userState);
    console.log("accessToken", accessToken);
  }, [userState, accessToken]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card title="Login" className="w-96">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            email: loginForm.email,
            password: loginForm.password,
          }}
          onFinish={() => loginMutation()}
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
