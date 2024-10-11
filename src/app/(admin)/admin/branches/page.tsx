"use client";

import { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { Breadcrumb, Button, Card, Divider, message, Segmented } from "antd";

import { useCustomAppQuery } from "@/hooks";
import { queries } from "@/services/db";

import { BranchesActions, BranchesList } from "@/components/branches";
import { TranslatedText } from "@/components/common";

import type { BreadcrumbProps } from "antd";

const breadcrumbItems: BreadcrumbProps["items"] = [
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
  },
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="branches" />,
  },
];

const AdminBranchesPage: React.FC = () => {
  /*
  const { loading, data } = useCustomAppQuery({
    query: queries.clinic.GetClinicAndBranches,
  });
  */
 const { loading, data } = useQuery(queries.clinic.GetClinicAndBranches);

  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      {/* <BranchesActions isLoading={loading} clinicName={data?.clinic[0]?.name} /> */}
      <BranchesActions clinicName={undefined} />
      <Divider className="my-2" />
      {/* <BranchesList isLoading={loading} branches={data?.clinic[0]?.branches} /> */}
    </div>
  );
};

export default AdminBranchesPage;
