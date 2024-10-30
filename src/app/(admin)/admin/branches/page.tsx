"use client";

import { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { Breadcrumb, Button, Card, Divider, message, Segmented } from "antd";

import { clinicQueries } from "@/apollo/query";
import { queries } from "@/services/db";

import BranchesActions from "@/components/branches/branches-actions";
import BranchesList from "@/components/branches/branches-list";
import InvitesList from "@/components/branches/invites-list";
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
  const { loading, data: clinicData } = useQuery(clinicQueries.GetClinics);
  const { loading: loadingInvitations, data: dataInvitations } = useQuery(queries.clinic.GetEmployeeInvitations);

  console.log("clinicData", clinicData);

  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <BranchesActions isLoading={loading} clinicName={clinicData?.clinics[0]?.clinic_name} />
      <Divider className="my-2" />
      <BranchesList isLoading={loading} branches={clinicData?.clinics[0]?.branches} />
      <Divider className="my-2" />
      <InvitesList
        isLoading={loadingInvitations}
        invitations={dataInvitations?.invitations}
        branches={clinicData?.clinics[0]?.branches.map((branch) => ({
          id: branch.id,
          branch_name: branch.branch_name,
        }))}
      />
    </div>
  );
};

export default AdminBranchesPage;
