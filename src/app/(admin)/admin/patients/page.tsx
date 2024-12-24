"use client";

import { useState } from "react";

import { Breadcrumb } from "antd";

import BranchPetList from "@/components/branches/branch-pet-list";
import { TranslatedText } from "@/components/common";
import CustomButton from "@/components/common/custom-button";

import type { BreadcrumbProps } from "antd";

const breadcrumbItems: BreadcrumbProps["items"] = [
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
  },
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="patients" />,
  },
];

const AdminPatientsPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 lg:grid-cols-[auto_240px] gap-4">
        <div className="flex flex-col gap-4">
          <BranchPetList />
        </div>
      </div>
    </div>
  );
};

export default AdminPatientsPage;
