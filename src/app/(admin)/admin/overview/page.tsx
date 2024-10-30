"use client";

import { Breadcrumb } from "antd";

import { TranslatedText } from "@/components/common";

import type { BreadcrumbProps } from "antd";

const AdminOverviewPage = () => {
  const breadcrumbItems: BreadcrumbProps["items"] = [
    {
      title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
    },
    {
      title: <TranslatedText tPrefix="breadcrumb" tKey="devices" />,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default AdminOverviewPage;
