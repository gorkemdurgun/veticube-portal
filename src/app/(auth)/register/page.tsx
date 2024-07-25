"use client";

import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined, FlagOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import userPool from "@/services/auth/userpool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

const Register: React.FC = () => {
  const router = useRouter();
  // const { signInEmailPassword, isLoading, isSuccess, isError, error } = useSignInEmailPassword();

  const [loginForm, setLoginForm] = useState({
    firstName: "",
    lastName: "",
    countryCode: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = () => {
    let attributes: CognitoUserAttribute[] = [];
    attributes.push(
      new CognitoUserAttribute({
        Name: "email",
        Value: loginForm.email,
      })
    );
    attributes.push(
      new CognitoUserAttribute({
        Name: "custom:firstName",
        Value: loginForm.firstName,
      })
    );
    attributes.push(
      new CognitoUserAttribute({
        Name: "custom:lastName",
        Value: loginForm.lastName,
      })
    );
    attributes.push(
      new CognitoUserAttribute({
        Name: "custom:countryCode",
        Value: loginForm.countryCode,
      })
    );
    attributes.push(
      new CognitoUserAttribute({
        Name: "custom:phoneNumber",
        Value: loginForm.phoneNumber,
      })
    );

    console.log(attributes);
    userPool.signUp(loginForm.email, loginForm.password, attributes, [], (err, data) => {
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
          <Form.Item name="firstName" rules={[{ required: true, message: "Please input your First Name!" }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="First Name"
              name="firstName"
              value={loginForm.firstName}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="lastName" rules={[{ required: true, message: "Please input your Last Name!" }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Last Name"
              name="lastName"
              value={loginForm.lastName}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="countryCode" rules={[{ required: true, message: "Please input your Country Code!" }]}>
            <Input
              prefix={<FlagOutlined className="site-form-item-icon" />}
              placeholder="Country Code"
              name="countryCode"
              value={loginForm.countryCode}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="phoneNumber" rules={[{ required: true, message: "Please input your Phone Number!" }]}>
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Phone Number"
              name="phoneNumber"
              value={loginForm.phoneNumber}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: "Please input your Email!" }]}>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
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
