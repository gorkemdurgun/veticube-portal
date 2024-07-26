"use client";

import { TranslatedText } from "@/components/common";
import { EmployeeActions } from "@/components/employees";
import { Breadcrumb, Button, Card, Divider, Segmented } from "antd";
import type { BreadcrumbProps } from "antd";
import { useState } from "react";

const AdminEmployeesPage: React.FC = () => {
  const breadcrumbItems: BreadcrumbProps["items"] = [
    {
      title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
    },
    {
      title: <TranslatedText tPrefix="breadcrumb" tKey="employees" />,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="w-full flex flex-row gap-4">
        <div className="w-full flex flex-col gap-4">
          <EmployeeActions />
          {/* <Card><EmployeeTable /></Card> */}
        </div>
        {/* <EmployeeDetails /> */}
      </div>
    </div>
  );
};

export default AdminEmployeesPage;
