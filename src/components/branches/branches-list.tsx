import { useEffect, useState } from "react";

import {
  PiUserCirclePlus as AddUserIcon,
  PiPhone as PhoneIcon,
  PiMapPin as AddressIcon,
  PiPencilSimple as EditIcon,
  PiSealCheckDuotone as VerifiedIcon,
  PiSealWarningDuotone as NotVerifiedIcon,
} from "react-icons/pi";

import { Badge, Button, Divider, List, message, Popconfirm, Table, Tooltip } from "antd";
import { useTranslation } from "react-i18next";

import { auth } from "@/services/auth";
import { queries } from "@/services/db";

import type { TableProps } from "antd";

import { TranslatedText } from "../common";
import { AddVeterinaryModal, VerifyUserModal } from "../modals";

type Props = {
  isLoading: boolean;
  branches?: ClinicBranchItem[];
};

const VetTable = ({ vets }: { vets: ClinicBranchVeterinarianItem[] }) => {
  const [verifyModalVisible, setVerifyModalVisible] = useState<boolean>(false);
  const [verifyVetModalData, setVerifyVetModalData] = useState({
    userEmail: "",
  });

  const onVerifyClick = (vetEmail: string) =>
    Promise.resolve(
      auth.signup.resendOtp(vetEmail, (email) => {
        message.success(`Verification email sent to ${email}`);
        setVerifyVetModalData({ userEmail: email });
        setTimeout(() => {
          setVerifyModalVisible(true);
        }, 1000);
      })
    );

  return (
    <>
      <VerifyUserModal visible={verifyModalVisible} setVisible={setVerifyModalVisible} data={verifyVetModalData} />
      <List
        dataSource={vets}
        renderItem={(vet) => {
          const isVetAuthorized = vet?.user?.allowed_roles?.includes("vet");
          const isVetVerified = vet?.user?.is_verified;
          return (
            <List.Item
              className="bg-gray-100 rounded-lg !p-4"
              actions={[
                <Popconfirm
                  key={vet.vetId}
                  disabled={isVetVerified}
                  overlayInnerStyle={{ width: "360px" }}
                  icon={null}
                  placement="bottomLeft"
                  title="Kullanıcı doğrulama"
                  description="Kullanıcının email adresine doğrulama kodu gönderilecektir. Devam etmek istiyor musunuz?"
                  onConfirm={() => onVerifyClick(vet?.user?.email)}
                >
                  <Button
                    disabled={isVetVerified}
                    danger={!isVetVerified}
                    className={isVetVerified ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"}
                  >
                    {isVetVerified ? (
                      <div className="flex flex-row gap-2">
                        <VerifiedIcon className="w-5 h-5" />
                        Verified User
                      </div>
                    ) : (
                      <div className="flex flex-row gap-2">
                        <NotVerifiedIcon className="w-5 h-5" />
                        Not Verified User (Click to Verify)
                      </div>
                    )}
                  </Button>
                </Popconfirm>,
                <Button
                  key={vet.vetId}
                  disabled={isVetAuthorized}
                  danger={!isVetAuthorized}
                  className={isVetAuthorized ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"}
                >
                  <span>
                    {isVetAuthorized ? (
                      <div className="flex flex-row items-center gap-2">
                        <VerifiedIcon className="w-5 h-5" />
                        Authorized Vet User
                      </div>
                    ) : (
                      <div className="flex flex-row items-center gap-2">
                        <NotVerifiedIcon className="w-5 h-5" />
                        Not Authorized Vet User
                      </div>
                    )}
                  </span>
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <div className="flex flex-row gap-2">
                    <span className="font-semibold">
                      {vet.user?.first_name} {vet.user?.last_name}
                    </span>
                    <span className="text-gray-500">{`(${vet.user?.email})`}</span>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
    </>
  );
};

export const BranchesList: React.FC<Props> = ({ isLoading, branches }) => {
  const { t } = useTranslation();
  const [addVetModalVisible, setAddVetModalVisible] = useState<boolean>(false);
  const [addVetModalData, setAddVetModalData] = useState({
    clinicId: "",
    branchName: "",
  });

  const onAddVetClick = (clinicId: string, branchName: string) => {
    setAddVetModalData({ clinicId, branchName });
    setAddVetModalVisible(true);
  };

  return (
    <>
      <AddVeterinaryModal visible={addVetModalVisible} setVisible={setAddVetModalVisible} data={addVetModalData} />
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
              rowExpandable: (record) => record.veterinarians.length > 0,
              defaultExpandedRowKeys: branches?.filter((branch) => branch.veterinarians.length > 0).map((branch) => branch.id),
              expandedRowRender: (record) => <VetTable vets={record.veterinarians} />,
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
                render: (record: ClinicBranchItem) => (
                  <div className="flex flex-row gap-2">
                    <Tooltip placement="bottom" title="Add Veterinarian">
                      <Button
                        type="link"
                        disabled={!record?.id && !record?.branch_name}
                        onClick={() => onAddVetClick(record.id, record.branch_name)}
                      >
                        <AddUserIcon className="w-5 h-5" />
                      </Button>
                    </Tooltip>
                  </div>
                ),
              },
            ]}
          />
        )}
      </div>
    </>
  );
};
