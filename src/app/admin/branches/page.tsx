"use client";

import { BranchesActions, BranchesList } from "@/components/branches";
import { TranslatedText } from "@/components/common";
import { EmployeeActions } from "@/components/employees";
import { queries } from "@/services/db";
import { Breadcrumb, Button, Card, Divider, Segmented } from "antd";
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
  const { data: clinicData, isLoading, refetch } = useQuery("clinic.getClinicAndBranches", queries.clinic.getClinicAndBranches);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <BranchesActions clinicName={clinicData?.name} />
      <BranchesList isLoading={isLoading} branches={clinicData?.branches} />
    </div>
  );
};

export default AdminBranchesPage;
