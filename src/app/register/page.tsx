"use client";

import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Divider, Form, Input, message } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { restServices } from "@/services";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { nhostHasuraRestApi } from "@/utils/api";
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

  /*
  nhostHasuraRestApi.get("/getUserRoles/bbeba8cc-4447-4a3e-8122-7585a399d78e").then((response) => {
    console.log(response.data);
  });
  */

  const {
    mutate: registerMutation,
    data: response,
    error,
    isError,
    isSuccess,
  } = useMutation(() => restServices.auth.signupEmailPassword(registerForm.email, registerForm.password));

  useEffect(() => {
    if (isSuccess) {
      message.success("Register success");
    } else if (isError) {
      let errorMessage = error as string;
      message.warning(errorMessage);
    }
  }, [isSuccess, isError, response, error]);

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
            email: registerForm.email,
            password: registerForm.password,
          }}
          onFinish={() => registerMutation()}
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
            {/* <Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}
          </Form.Item>
          <Form.Item>
            <div className="flex flex-col text-center">
              <Button type="primary" htmlType="submit" className="register-form-button">
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
