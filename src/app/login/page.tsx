"use client";

import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { authenticate } from "@/services/auth/authenticate";

const Login: React.FC = () => {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [isNotConfirmed, setIsNotConfirmed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = () => {
    authenticate(loginForm.email, loginForm.password)
      .then((data) => {
        console.log("Login success", data);
        // router.push("/");
      })
      .catch((err) => {
        message.error(err.message);
        if (err.code === "UserNotConfirmedException") {
          setIsNotConfirmed(true);
        }
      });
  };

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
          initialValues={{
            email: loginForm.email,
            password: loginForm.password,
          }}
          onFinish={handleSubmit}
          // onFinish={() => signInEmailPassword(loginForm.email, loginForm.password)}
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
          <Form hidden={!isNotConfirmed}>
            <Form.Item>
              <Button type="primary" onClick={() => router.push(`/confirm?email=${loginForm.email}`)}>
                Confirm Email
              </Button>
            </Form.Item>
          </Form>
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
