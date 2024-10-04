"use client";

import React, { useEffect, useState } from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Divider, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector, useCustomAppQuery } from "@/hooks";
import { loginRequest } from "@/redux/slices/auth/authSlice";
import { queries } from "@/services/db";

import { VerifyUserModal } from "@/components/modals";

type LoginForm = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.auth);

  const [loginForm] = Form.useForm<LoginForm>();
  const [userId, setUserId] = useState<string | null>(null);
  const [isNotConfirmed, setIsNotConfirmed] = useState(false);

  const { data: userData } = useCustomAppQuery({
    query: queries.user.GetUser,
    options: {
      skip: !userId,
      variables: {
        id: userId,
      },
    },
  });

  const handleSubmit = () => {
    loginForm.validateFields().then(() => {
      dispatch(
        loginRequest({
          email: loginForm.getFieldValue("email"),
          password: loginForm.getFieldValue("password"),
          onSuccess: () => {
            router.push("/admin");
          },
        })
      );
    });
  };

  return (
    <>
      <VerifyUserModal
        visible={isNotConfirmed}
        setVisible={setIsNotConfirmed}
        data={{
          userEmail: loginForm.getFieldValue("email"),
        }}
      />
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
            form={loginForm}
            initialValues={{
              email: "",
              password: "Goko3599.",
            }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
              validateStatus={isNotConfirmed ? "warning" : undefined}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" name="email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item>
              <div className="flex flex-col text-center">
                <Button loading={undefined} type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                <Divider>
                  <span className="font-normal text-gray-500">or</span>
                </Divider>
                <Button disabled type="link" href="/register">
                  Register
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login;
