"use client";

import { Breadcrumb } from "antd";

import ClientsList from "@/components/branches/clients-list";
import { TranslatedText } from "@/components/common";

import type { BreadcrumbProps } from "antd";

const breadcrumbItems: BreadcrumbProps["items"] = [
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
  },
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="clients" />,
  },
];

const AdminClientsPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 lg:grid-cols-[auto_240px] gap-4">
        <ClientsList />
      </div>
    </div>
  );
};

export default AdminClientsPage;
