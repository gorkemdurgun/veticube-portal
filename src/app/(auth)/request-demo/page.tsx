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

import { Badge, Checkbox, Divider, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

import { useCustomAppQuery } from "@/hooks";
import { queries } from "@/services/db";

import { CustomButton } from "@/components/common";

type RequestDemoForm = {
  clinic: {
    name: string;
    city: string;
    district: string;
    address: string;
    services_offered: string[];
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
  const [activeTab, setActiveTab] = useState<"clinic" | "user">("clinic");
  const [requestDemoForm] = Form.useForm<RequestDemoForm>();

  const { data: userData } = useCustomAppQuery({
    query: queries.user.GetUser,
    options: {
      skip: true,
      variables: {},
    },
  });

  const handleSubmit = () => {
    console.log("Request Demo form values:", requestDemoForm.getFieldsValue());
    requestDemoForm.validateFields().then(() => {});
  };

  const FeatureCard: React.FC<{
    title: string;
    description: string;
    icon: IconType;
    soon?: boolean;
  }> = ({ title, description, icon, soon }) => {
    let iconClass = "w-5 h-5 text-blue-900 group-hover:scale-110 transition-transform duration-300";
    return (
      <Badge.Ribbon className={`${soon ? "" : "hidden"}`} text="Soon" color="geekblue">
        <div className={`group cursor-pointer w-full flex flex-col gap-1 py-2 px-4 rounded-xl bg-gradient-to-r from-white to-teal-50`}>
          <div className="flex gap-1 items-center">
            {icon({ className: iconClass })}
            <Divider type="vertical" className="h-4 !border-blue-900" />
            <h5 className="text-md text-blue-900">{title}</h5>
          </div>
          <p className="text-sm text-gray-800 transition-all duration-300">{description}</p>
        </div>
      </Badge.Ribbon>
    );
  };

  const ClinicForm: React.FC = () => {
    return (
      <Form name="request-demo-form" layout="vertical" preserve={false} form={requestDemoForm}>
        <div className="flex flex-col">
          <h5 className="text-xl text-gray-800">Clinic Information</h5>
          <Divider className="mt-2 mb-6" />
          <Form.Item name="clinic_name" label="Clinic Name" rules={[{ required: true, message: "Please input your Email!" }]}>
            <Input placeholder="Clinic Name" name="clinic_name" />
          </Form.Item>
          <div className="grid grid-cols-2 gap-2">
            <Form.Item name="city" label="City" rules={[{ required: true, message: "Please input your City!" }]}>
              <Input placeholder="City" name="city" />
            </Form.Item>
            <Form.Item name="district" label="District" rules={[{ required: true, message: "Please input your District!" }]}>
              <Input placeholder="District" name="district" />
            </Form.Item>
          </div>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please input your Address!" }]}>
            <Input.TextArea placeholder="Address" name="address" rows={3} />
          </Form.Item>
          <Form.Item
            name="services_offered"
            label="Services Offered"
            rules={[{ required: true, message: "Please select at least one service!" }]}
          >
            <Checkbox.Group
              className="grid grid-cols-2 gap-1"
              options={["Muayene", "Ameliyat", "Aşı", "Laboratuvar", "Radyoloji", "Ürün Satışı"]}
            />
          </Form.Item>
        </div>
      </Form>
    );
  };
  const UserForm: React.FC = () => {
    return (
      <Form name="request-demo-form" layout="vertical" preserve={false} form={requestDemoForm}>
        <div className="flex flex-col">
          <h5 className="text-xl text-gray-800">User Information</h5>
          <Divider className="mt-2 mb-6" />
          <div className="grid grid-cols-2 gap-2">
            <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: "Please input your First Name!" }]}>
              <Input placeholder="First Name" name="first_name" />
            </Form.Item>
            <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: "Please input your Last Name!" }]}>
              <Input placeholder="Last Name" name="last_name" />
            </Form.Item>
          </div>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input your Email!" }]}>
            <Input placeholder="Email" name="email" />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Please input your Phone!" }]}>
            <Input placeholder="Phone" name="phone" />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2">
          <Form.Item name="active_softwares" label="Daha önce kullandığınız yazılımlar">
            <Checkbox.Group className="grid grid-cols-2 gap-1" options={["MediSoft", "MediSoft Mobile", "MediSoft Web", "MediSoft AI"]} />
          </Form.Item>
          <Form.Item
            name="feedback_channel"
            label="Size ulaşabileceğimiz kanallar"
            rules={[{ required: true, message: "Please select at least one channel!" }]}
          >
            <Checkbox.Group className="grid grid-cols-2 gap-1" options={["Email", "Phone", "SMS", "WhatsApp"]} />
          </Form.Item>
        </div>
      </Form>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-between gap-32 p-16 bg-gradient-to-tr from-green-50 to-green-100">
      <div className="flex flex-col gap-6">
        <span>
          <h5 className="text-5xl heading-gradient font-bold">Request demo, start today</h5>
          <p className="text-2xl text-green-500">Fill in the form right away, and we will get back to you shortly</p>
        </span>
        <div className="flex flex-col">
          <Divider orientation="left" className="!border-gray-600">
            <h2 className="text-lg text-gray-600 font-raleway">What we offer you</h2>
          </Divider>
          <div className="flex flex-col gap-3">
            <FeatureCard
              title="Easily manage your clients"
              description="Easily manage your clients and their transactions and more"
              icon={ManageClientsIcon}
            />
            <FeatureCard
              title="Record your patients data"
              description="Record and edit your patients data, display their medical history"
              icon={ManagePatientsIcon}
            />
            <FeatureCard
              title="Direct your employees"
              description="Create new branches, manage employees and their roles"
              icon={BranchesIcon}
            />
            <FeatureCard
              title="Track your devices"
              description="You are in control, track and manage your devices and their status"
              icon={DevicesIcon}
            />
            <FeatureCard title="AI powered features" description="AI powered features to help you make better decisions" icon={AiIcon} />
            <FeatureCard
              soon
              title="Advanced appointment system"
              description="Schedule, reschedule, or cancel appointments"
              icon={AppointmentsIcon}
            />
            <FeatureCard soon title="Detailed reports" description="Generate detailed reports for your clinic" icon={ReportsIcon} />
          </div>
        </div>
      </div>
      <div className="mx-auto">
        <div className="h-[540px] w-[420px] p-8 shadow-lg bg-white rounded-xl">
          {activeTab === "clinic" && <ClinicForm />}
          {activeTab === "user" && <UserForm />}
        </div>
        {activeTab === "clinic" && (
          <div className="flex justify-end gap-2">
            <CustomButton className="w-full mt-4" size="lg" variant="primary-opaque" onClick={() => setActiveTab("user")}>
              Next
            </CustomButton>
          </div>
        )}
        {activeTab === "user" && (
          <div className="grid grid-cols-[1fr,2fr] gap-2">
            <CustomButton className="w-full mt-4" size="lg" variant="primary-opaque" onClick={() => setActiveTab("clinic")}>
              Back
            </CustomButton>
            <CustomButton className="w-full mt-4" size="lg" variant="primary-opaque" onClick={handleSubmit}>
              Request Demo
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDemoPage;
