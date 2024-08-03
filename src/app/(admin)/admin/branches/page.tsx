"use client";

import { BranchesActions, BranchesList } from "@/components/branches";
import { TranslatedText } from "@/components/common";
import { EmployeeActions } from "@/components/employees";
import { queries } from "@/services/db";
import { Breadcrumb, Button, Card, Divider, message, Segmented } from "antd";
import type { BreadcrumbProps } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const breadcrumbItems: BreadcrumbProps["items"] = [
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
  },
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="branches" />,
  },
];

const AdminBranchesPage: React.FC = () => {
  const { data: clinicData, isLoading, isError} = useQuery("clinic.getClinicAndBranches", queries.clinic.getClinicAndBranches);


  if (isLoading) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center gap-4">Loading...</div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center gap-4">Error...</div>
      </Card>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <BranchesActions isLoading={isLoading} clinicName={clinicData?.name} />
      <Divider className="my-2" />
      <BranchesList isLoading={isLoading} branches={clinicData?.branches} />
    </div>
  );
};

export default AdminBranchesPage;
