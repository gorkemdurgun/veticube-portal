"use client";

import { BranchesActions, BranchesList } from "@/components/branches";
import { TranslatedText } from "@/components/common";
import { Breadcrumb, Button, Card, Divider, message, Segmented } from "antd";
import type { BreadcrumbProps } from "antd";
import { useEffect, useState } from "react";
import { useAppQuery } from "@/hooks";

const breadcrumbItems: BreadcrumbProps["items"] = [
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
  },
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="branches" />,
  },
];

const AdminBranchesPage: React.FC = () => {
  const { loading, error, data, refetch } = useAppQuery("GetClinicAndBranches", {
    context: {
      headers: {
        "x-hasura-role": "manager",
      },
    },
  });

  useEffect(() => {
    console.log("Clinic data", data);
  }, [data]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <BranchesActions isLoading={loading} clinicName={data?.clinic[0]?.name} />
      <Divider className="my-2" />
      <BranchesList isLoading={loading} branches={data?.clinic[0]?.branches} />
    </div>
  );
};

export default AdminBranchesPage;
