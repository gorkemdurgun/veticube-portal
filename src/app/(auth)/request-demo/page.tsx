"use client";

import React, { useEffect, useState } from "react";

import {
  PiUserDuotone as ManageClientsIcon,
  PiDogDuotone as ManagePatientsIcon,
  PiStorefrontDuotone as BranchesIcon,
  PiDeviceTabletDuotone as DevicesIcon,
  PiHeadCircuitDuotone as AiIcon,
  PiCalendarDotsDuotone as AppointmentsIcon,
  PiChartBarDuotone as ReportsIcon,
} from "react-icons/pi";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Descriptions, Divider, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector, useCustomAppQuery } from "@/hooks";
import { loginRequest } from "@/redux/slices/authSlice";
import { queries } from "@/services/db";

import { CustomButton } from "@/components/common";
import { VerifyUserModal } from "@/components/modals";

type RequestDemoForm = {
  clinic: {
    name: string;
    city: string;
    district: string;
    address: string;
    phone: string;
    website?: string;
    number_of_vets: number;
    services_offered?: string[];
  };
  user: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  active_softwares?: string[];
  feedback_channel?: string;
};

const RequestDemoPage: React.FC = () => {
  const router = useRouter();

  const [requestDemoForm] = Form.useForm<RequestDemoForm>();

  const { data: userData } = useCustomAppQuery({
    query: queries.user.GetUser,
    options: {
      variables: {},
    },
  });

  const handleSubmit = () => {
    console.log("Request Demo form values:", requestDemoForm.getFieldsValue());
    // requestDemoForm.validateFields().then(() => {});
  };

  const FeatureCard: React.FC<{
    title: string;
    description: string;
    icon: React.ReactNode;
    soon?: boolean;
  }> = ({ title, description, icon, soon }) => {
    return (
      <Badge.Ribbon className={`${soon ? "" : "hidden"}`} text="Soon" color="geekblue">
        <div className={`group cursor-pointer w-full flex flex-col gap-1 py-2 px-4 rounded-xl bg-gradient-to-r from-white to-teal-50`}>
          <div className="flex gap-1 items-center">
            {icon}
            <Divider type="vertical" className="h-4 !border-blue-900" />
            <h5 className="text-md text-blue-900">{title}</h5>
          </div>
          <p className="text-sm text-gray-800 transition-all duration-300">{description}</p>
        </div>
      </Badge.Ribbon>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-between gap-24 p-16 bg-gradient-to-tr from-green-50 to-green-100">
      <div className="flex flex-col gap-6">
        <span>
          <h5 className="text-5xl heading-gradient font-bold">Request demo, start today</h5>
          <p className="text-2xl text-green-500">Fill in the form right away, and we will get back to you shortly</p>
        </span>
        <div className="flex flex-col gap-2">
          <Divider orientation="left" className="!border-gray-800">
            <h2 className="text-lg text-gray-800 font-raleway">What we offer you</h2>
          </Divider>
          <div className="flex flex-col gap-3">
            <FeatureCard
              title="Easily manage your clients"
              description="Easily manage your clients and their transactions, appointments, and more"
              icon={<ManageClientsIcon className="w-5 h-5 text-blue-900" />}
            />
            <FeatureCard
              title="Record your patients data"
              description="Record and edit your patients data, display their medical history"
              icon={<ManagePatientsIcon className="w-5 h-5 text-blue-900" />}
            />
            <FeatureCard
              title="Direct your employees"
              description="Create new branches, manage employees and their roles"
              icon={<BranchesIcon className="w-5 h-5 text-blue-900" />}
            />
            <FeatureCard
              title="Track your devices"
              description="You are in control, track and manage your devices and their status"
              icon={<DevicesIcon className="w-5 h-5 text-blue-900" />}
            />
            <FeatureCard
              title="AI powered features"
              description="AI powered features to help you make better decisions"
              icon={<AiIcon className="w-5 h-5 text-blue-900" />}
            />
            <FeatureCard
              soon
              title="Advanced appointment system"
              description="Schedule, reschedule, or cancel appointments"
              icon={<AppointmentsIcon className="w-5 h-5 text-blue-900" />}
            />
            <FeatureCard
              soon
              title="Detailed reports"
              description="Generate detailed reports for your clinic"
              icon={<ReportsIcon className="w-5 h-5 text-blue-900" />}
            />
          </div>
        </div>
      </div>
      <div className="w-96 p-8 bg-white rounded-xl">
        <Form name="request-demo-form" preserve={false} form={requestDemoForm} onFinish={handleSubmit}>
          <div className="flex flex-col">
            <h5 className="text-xl text-gray-800">Clinic Information</h5>
            <Divider className="mt-2 mb-6" />
            <Form.Item name="clinic_name" rules={[{ required: true, message: "Please input your Email!" }]}>
              <Input placeholder="Clinic Name" name="clinic_name" />
            </Form.Item>
            <div className="grid grid-cols-2 gap-2">
              <Form.Item name="city" rules={[{ required: true, message: "Please input your City!" }]}>
                <Input placeholder="City" name="city" />
              </Form.Item>
              <Form.Item name="district" rules={[{ required: true, message: "Please input your District!" }]}>
                <Input placeholder="District" name="district" />
              </Form.Item>
            </div>
            <Form.Item name="phone" rules={[{ required: true, message: "Please input your Phone!" }]}>
              <Input placeholder="Phone" name="phone" />
            </Form.Item>
            <Form.Item name="address" rules={[{ required: true, message: "Please input your Address!" }]}>
              <Input.TextArea placeholder="Address" name="address" />
            </Form.Item>
          </div>
          <div className="flex flex-col mt-6">
            <h5 className="text-xl text-gray-800">User Information</h5>
            <Divider className="mt-2 mb-6" />
            <div className="grid grid-cols-2 gap-2">
              <Form.Item name="first_name" rules={[{ required: true, message: "Please input your First Name!" }]}>
                <Input placeholder="First Name" name="first_name" />
              </Form.Item>
              <Form.Item name="last_name" rules={[{ required: true, message: "Please input your Last Name!" }]}>
                <Input placeholder="Last Name" name="last_name" />
              </Form.Item>
            </div>
            <Form.Item name="email" rules={[{ required: true, message: "Please input your Email!" }]}>
              <Input placeholder="Email" name="email" />
            </Form.Item>
            <Form.Item name="phone" rules={[{ required: true, message: "Please input your Phone!" }]}>
              <Input placeholder="Phone" name="phone" />
            </Form.Item>
          </div>
          <CustomButton className="w-full mt-4" variant="primary-opaque">
            Request Demo
          </CustomButton>
        </Form>
      </div>
    </div>
  );
};

export default RequestDemoPage;
