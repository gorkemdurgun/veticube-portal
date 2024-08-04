"use client";

import { BranchesActions, BranchesList } from "@/components/branches";
import { TranslatedText } from "@/components/common";
import { EmployeeActions } from "@/components/employees";
import { queries } from "@/services/db";
import { Breadcrumb, Button, Card, Divider, message, Segmented } from "antd";
import type { BreadcrumbProps } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
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

  const handleRefetch = () => {
    refetch()
      .then((res) => {
        console.log("Refetched", res);
      })
      .catch((err) => {
        console.log("Error refetching");
      });
  };

  useEffect(() => {
    console.log("Clinic data", data);
  }, [data]);

  // if (isFetching) return <div>Fetching...</div>;
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <Button onClick={handleRefetch}>Refetch</Button>
      <BranchesActions isLoading={loading} clinicName={data?.clinic[0]?.name} />
      <Divider className="my-2" />
      <BranchesList isLoading={loading} branches={data?.clinic[0]?.branches} />
    </div>
  );
};

export default AdminBranchesPage;
