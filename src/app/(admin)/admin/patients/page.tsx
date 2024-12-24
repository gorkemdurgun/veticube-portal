"use client";

import { useState } from "react";

import { Breadcrumb } from "antd";

import OwnedPatientsList from "@/components/branches/owned-patients-list";
import UnownedPatientsList from "@/components/branches/unowned-patients-list";
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
  const [selectedTab, setSelectedTab] = useState<"owned" | "unowned">("owned");

  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 lg:grid-cols-[auto_240px] gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <CustomButton variant={selectedTab === "owned" ? "secondary-opaque" : "secondary-faded"} onClick={() => setSelectedTab("owned")}>
              Sahipli Hastalar
            </CustomButton>
            <CustomButton
              variant={selectedTab === "unowned" ? "secondary-opaque" : "secondary-faded"}
              onClick={() => setSelectedTab("unowned")}
            >
              Sahipsiz Hastalar
            </CustomButton>
          </div>
          {selectedTab === "owned" && <OwnedPatientsList />}
          {selectedTab === "unowned" && <UnownedPatientsList />}
        </div>
      </div>
    </div>
  );
};

export default AdminPatientsPage;
