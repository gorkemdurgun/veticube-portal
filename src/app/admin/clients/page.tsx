"use client";

import { TranslatedText } from "@/components/common";
import { Breadcrumb, Card, Divider, Segmented } from "antd";
import type { BreadcrumbProps } from "antd";
import { useState } from "react";

const AdminClientsPage: React.FC = () => {
  const breadcrumbItems: BreadcrumbProps["items"] = [
    {
      title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
    },
    {
      title: <TranslatedText tPrefix="breadcrumb" tKey="clients" />,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex flex-row gap-4">AdminClientsPage</div>
    </div>
  );
};

export default AdminClientsPage;
