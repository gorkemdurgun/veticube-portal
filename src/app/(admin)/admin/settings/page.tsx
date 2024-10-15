"use client";

import { useState } from "react";

import { Breadcrumb, Card, Divider, Segmented } from "antd";

import { TranslatedText } from "@/components/common";
import MyInvites from "@/components/settings/my-invites";

import type { BreadcrumbProps } from "antd";

const AdminSettingsPage: React.FC = () => {
  const breadcrumbItems: BreadcrumbProps["items"] = [
    {
      title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
    },
    {
      title: <TranslatedText tPrefix="breadcrumb" tKey="settings" />,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <MyInvites />
    </div>
  );
};

export default AdminSettingsPage;
