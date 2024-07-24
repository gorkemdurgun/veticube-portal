"use client";

import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { authenticate } from "@/services/auth/authenticate";
import { queries } from "@/services/db";

const Login: React.FC = () => {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "Goko3599.",
  });
  const [isNotConfirmed, setIsNotConfirmed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = () => {
    authenticate(loginForm.email, loginForm.password).catch((err) => {
      if (err.code === "UserNotConfirmedException") {
        setIsNotConfirmed(true);
        message.warning("User not confirmed, please check your email to confirm your account.");
      } else {
        message.error(err.message);
      }
    });
  };

  /*
  queries.deneme.getDeneme().then((res) => {
    console.log("deneme", res);
  });
  */

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card
        title="Login"
        className="w-96"
        classNames={{
          title: "text-2xl text-center",
        }}
      >
        <Form
          name="normal_login"
          className="login-form"
          preserve={false}
          initialValues={{
            email: loginForm.email,
            password: loginForm.password,
          }}
          onFinish={handleSubmit}
          // onFinish={() => signInEmailPassword(loginForm.email, loginForm.password)}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
            validateStatus={isNotConfirmed ? "warning" : undefined}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
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
            <div className="flex flex-col text-center">
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <Divider>
                <span className="font-normal text-gray-500">or</span>
              </Divider>
              <Button type="link" href="/register">
                Register
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
