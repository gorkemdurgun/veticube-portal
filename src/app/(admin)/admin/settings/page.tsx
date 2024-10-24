"use client";

import { useState } from "react";

import { Breadcrumb, Card, Divider, Menu, Segmented } from "antd";

import { ComponentCard, TranslatedText } from "@/components/common";
import MyInvites from "@/components/settings/my-invites";

import type { BreadcrumbProps } from "antd";

const breadcrumbItems: BreadcrumbProps["items"] = [
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
  },
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="settings" />,
  },
];

const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-[240px,1fr] rounded-lg">
        {/* <MyInvites /> */}
        <Menu
          className="p-2 rounded-l-lg border-0"
          mode="inline"
          defaultSelectedKeys={["profile"]}
          selectedKeys={[activeTab]}
          onSelect={({ key }) => setActiveTab(key)}
          items={[
            {
              key: "profile",
              label: "Profil Ayarları",
            },
            {
              key: "invites",
              label: "Davetlerim",
            },
          ]}
        />
        <div className="flex flex-col gap-4 p-2 rounded-r-lg bg-white">
          {activeTab === "profile" && <div className="flex flex-col rounded-r-lg">Ayarlar Formu</div>}
          {activeTab === "invites" && <MyInvites />}
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
