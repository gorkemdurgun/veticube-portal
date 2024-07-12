"use client";

import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { restServices } from "@/services";
import { useRouter } from "next/navigation";
// import { login } from "@/redux/slices/auth/authSlice";

const Register: React.FC = () => {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  // const { user: userState } = useAppSelector((state) => state.auth);

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const onFinish = () => {
    console.log("Received values of form: ", registerForm);
    restServices.auth.signupEmailPassword(registerForm.email, registerForm.password).then((response) => {
      router.push("/login");
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card title="Register" className="w-96">
        <div className="max-w-[300px] overflow-scroll"></div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            email: registerForm.email,
            password: registerForm.password,
          }}
          onFinish={onFinish}
        >
          <Form.Item name="email" rules={[{ required: true, message: "Please input your Email!" }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              name="email"
              value={registerForm.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              autoComplete="off"
              type="password"
              placeholder="Password"
              name="password"
              value={registerForm.password}
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
