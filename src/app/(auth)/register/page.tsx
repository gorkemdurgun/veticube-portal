"use client";

import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { authenticate } from "@/services/auth/authenticate";
import userPool from "@/services/auth/userpool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

const Register: React.FC = () => {
  const router = useRouter();
  // const { signInEmailPassword, isLoading, isSuccess, isError, error } = useSignInEmailPassword();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const attributes: CognitoUserAttribute[] = [];
  attributes.push(
    new CognitoUserAttribute({
      Name: "email",
      Value: loginForm.email,
    })
  );
  attributes.push(
    new CognitoUserAttribute({
      Name: "custom:role",
      Value: "user",
    })
  );
  attributes.push(
    new CognitoUserAttribute({
      Name: "custom:allowedRoles",
      Value: "user,client",
    })
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = () => {
    userPool.signUp(loginForm.email, loginForm.password, attributes, attributes, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card
        title="Register"
        className="w-96"
        classNames={{
          title: "text-2xl text-center",
        }}
      >
        <Form
          name="normal_register"
          className="register-form"
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
                Register
              </Button>
              <Divider>
                <span className="font-normal text-gray-500">or</span>
              </Divider>
              <Button type="link" href="/login">
                Login
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
