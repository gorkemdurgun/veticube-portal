"use client";

import React, { useEffect, useState } from "react";

import { LockOutlined, UserOutlined, MailOutlined, FlagOutlined, PhoneOutlined } from "@ant-design/icons";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { Button, Card, Divider, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

import { countries } from "@/constants/countries";
import userPool from "@/services/cognito/userpool";

import { CountrySelector } from "@/components/common";

type RegisterFormValues = {
  first_name: string;
  last_name: string;
  country_code: string;
  phone_number: string;
  email: string;
  pasword: string;
};

const Register: React.FC = () => {
  const router = useRouter();
  const [registerForm] = Form.useForm<RegisterFormValues>();

  const handleSubmit = () => {
    let attributes: CognitoUserAttribute[] = [];

    attributes.push(
      new CognitoUserAttribute({
        Name: "email",
        Value: registerForm.getFieldValue("email"),
      })
    );
    attributes.push(
      new CognitoUserAttribute({
        Name: "name",
        Value: registerForm.getFieldValue("first_name"),
      })
    );
    attributes.push(
      new CognitoUserAttribute({
        Name: "family_name",
        Value: registerForm.getFieldValue("last_name"),
      })
    );
    attributes.push(
      new CognitoUserAttribute({
        Name: "phone_number",
        Value: registerForm.getFieldValue("country_code") + registerForm.getFieldValue("phone_number"),
      })
    );

    console.log(attributes);

    userPool.signUp(registerForm.getFieldValue("email").split("@")[0], registerForm.getFieldValue("password"), attributes, [], (err, data) => {
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
        className="w-xl"
        classNames={{
          title: "text-2xl text-center",
        }}
      >
        <Form
          name="create-vet-form"
          layout="vertical"
          form={registerForm}
          onFinish={handleSubmit}
          initialValues={{
            email: "",
            first_name: "",
            last_name: "",
            country_code: "(+90) TR",
            phone_number: "",
            password: "",
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: "Please input first name!" }]}>
              <Input placeholder="Vet First Name" />
            </Form.Item>
            <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: "Please input last name!" }]}>
              <Input placeholder="Vet Last Name" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="country_code"
              label="Country Code"
              preserve={false}
              rules={[{ required: true, message: "Please input country code!" }]}
            >
              <CountrySelector
                value={registerForm.getFieldValue("country_code")}
                onChange={(value) => {
                  console.log(value);
                  registerForm.setFieldsValue({ country_code: value });
                }}
              />
            </Form.Item>
            <Form.Item name="phone_number" label="Phone Number" rules={[{ required: true, message: "Please input phone number!" }]}>
              <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
            </Form.Item>
          </div>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input email!" }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input password!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <div className="flex flex-col text-center">
              <Button type="primary" htmlType="submit" className="login-form-button">
                Register
              </Button>
              <Divider>
                <span className="font-normal text-gray-500">or</span>
              </Divider>
              <Button type="link" href="/register-verify">
                Verify Account
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
