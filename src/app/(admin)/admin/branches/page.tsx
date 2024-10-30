"use client";

import { useQuery } from "@apollo/client";
import { Breadcrumb, Divider } from "antd";

import { clinicQueries } from "@/apollo/query";

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
  const { loading: clinicDetailLoading, data: clinicDetailData } = useQuery(clinicQueries.GetClinicDetail);
  const { loading: branchInvitationsLoading, data: branchInvitationsData } = useQuery(clinicQueries.GetBranchPendingInvitations);

  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <BranchesActions isLoading={clinicDetailLoading} clinicName={clinicDetailData?.clinics[0]?.clinic_name} />
      <Divider className="my-2" />
      <BranchesList isLoading={clinicDetailLoading} branches={clinicDetailData?.clinics[0]?.branches} />
      <Divider className="my-2" />
      <InvitesList
        isLoading={branchInvitationsLoading}
        invitations={branchInvitationsData?.invitations}
        branches={clinicDetailData?.clinics[0]?.branches.map((branch) => ({
          id: branch.id,
          branch_name: branch.branch_name,
        }))}
      />
    </div>
  );
};

export default AdminBranchesPage;
