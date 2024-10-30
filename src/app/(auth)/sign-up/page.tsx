"use client";

import React, { useState } from "react";

import { LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/hooks";
import { signUpRequest } from "@/redux/slices/auth/authSlice";

import { CountrySelector } from "@/components/common";
import VerifyUserModal from "@/components/modals/users/verify-user-modal";

type SignupFormValues = {
  first_name: string;
  last_name: string;
  country_code: string;
  phone_number: string;
  email: string;
  pasword: string;
};

const Signup: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [registerForm] = Form.useForm<SignupFormValues>();
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  const handleSubmit = () => {
    dispatch(
      signUpRequest({
        email: registerForm.getFieldValue("email"),
        password: registerForm.getFieldValue("password"),
        name: `${registerForm.getFieldValue("first_name")} ${registerForm.getFieldValue("last_name")}`,
        phone_number: registerForm.getFieldValue("country_code") + registerForm.getFieldValue("phone_number"),
        onSuccess: () => {
          message.success("User created successfully");
          setOpenVerifyModal(true);
        },
      })
    );
  };

  return (
    <>
      <VerifyUserModal
        visible={openVerifyModal}
        setVisible={setOpenVerifyModal}
        data={{ userEmail: registerForm.getFieldValue("email") }}
        onSuccess={() => {
          registerForm.resetFields();
          router.push("/login");
        }}
        onClosed={() => {
          registerForm.resetFields();
        }}
      />
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
              <Form.Item name="first_name" label="Ad" rules={[{ required: true, message: "Please input first name!" }]}>
                <Input placeholder="Adınızı girin" />
              </Form.Item>
              <Form.Item name="last_name" label="Soyad" rules={[{ required: true, message: "Please input last name!" }]}>
                <Input placeholder="Soyadınızı girin" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="country_code"
                label="Ülke Kodu"
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
              <Form.Item name="phone_number" label="Telefon Numarası" rules={[{ required: true, message: "Please input phone number!" }]}>
                <Input prefix={<PhoneOutlined />} placeholder="Başında sıfır olmadan girin" />
              </Form.Item>
            </div>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input email!" }]}>
              <Input prefix={<MailOutlined />} placeholder="Email adresinizi girin" />
            </Form.Item>
            <Form.Item name="password" label="Şifre" rules={[{ required: true, message: "Please input password!" }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Şifre belirleyin" />
            </Form.Item>
            <Form.Item>
              <div className="flex flex-col text-center">
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Kayıt Ol
                </Button>
                <Divider>
                  <span className="text-sm text-gray-500 font-normal">Zaten bir hesabınız var mı?</span>
                </Divider>
                <Button className="text-md text-green-700" type="link" onClick={() => router.push("/login")}>
                  Giriş Yap
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Signup;
