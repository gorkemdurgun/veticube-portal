import { useState } from "react";

import { PiPencilSimple as EditIcon, PiSealWarningDuotone as NotVerifiedIcon, PiSealCheckDuotone as VerifiedIcon } from "react-icons/pi";

import { Button, List, message, Popconfirm, Table, Tooltip } from "antd";
import { useTranslation } from "react-i18next";

import { auth } from "@/services/aws/cognito";

import BranchesListFooter from "./branches-list-footer";

import { TranslatedText } from "../common";
import VerifyUserModal from "../modals/users/verify-user-modal";

type Props = {
  isLoading: boolean;
  branches?: {
    id: string;
    branch_name: string;
    phone_number: string;
    city: string;
    address: string;
    employees: {
      user_id: string;
      role: string;
    }[];
  }[];
};

const BranchesList: React.FC<Props> = ({ isLoading, branches }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <TranslatedText className="text-2xl font-semibold" tPrefix="components" tKey="branches.branches-list.list" />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Table
            dataSource={branches}
            rowKey="id"
            rowClassName="cursor-pointer"
            pagination={false}
            expandable={{
              expandRowByClick: true,
              // rowExpandable: (record) => record.veterinarians.length > 0,
              // defaultExpandedRowKeys: branches?.filter((branch) => branch.veterinarians.length > 0).map((branch) => branch.id),
              // expandedRowRender: (record) => <VetTable vets={record.veterinarians} />,
            }}
            columns={[
              {
                title: t("components.branches.branches-list.columns.name"),
                dataIndex: "branch_name",
                key: "branch_name",
                render: (name: string) => <strong>{name}</strong>,
              },
              {
                title: t("components.branches.branches-list.columns.address"),
                dataIndex: "address",
                key: "address",
                render: (address: string) => <span>{address || "-"}</span>,
              },
              {
                title: t("components.branches.branches-list.columns.city"),
                dataIndex: "city",
                key: "city",
                render: (city: string) => <span>{city || "-"}</span>,
              },
              {
                title: t("components.branches.branches-list.columns.phone"),
                dataIndex: "phone",
                key: "phone",
                render: (phone: string) => <span>{phone || "-"}</span>,
              },
              {
                title: t("components.branches.branches-list.columns.actions"),
                key: "actions",
                render: (record: { id: string; branch_name: string }) => (
                  <div className="flex flex-row gap-2">
                    <Tooltip placement="bottom" title="Add Veterinarian">
                      <Button
                        type="link"
                        disabled={!record?.id && !record?.branch_name}
                        // onClick={() => onAddVetClick(record.id, record.branch_name)}
                      >
                        <EditIcon className="w-5 h-5" />
                      </Button>
                    </Tooltip>
                  </div>
                ),
              },
            ]}
            footer={() => <BranchesListFooter isLoading={isLoading} branches={branches} />}
          />
        )}
      </div>
    </>
  );
};

export default BranchesList;
