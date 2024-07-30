import { queries } from "@/services/db";
import { Badge, Button, List, message, Popconfirm, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  PiPhone as PhoneIcon,
  PiMapPin as AddressIcon,
  PiPencilSimple as EditIcon,
  PiSealCheckDuotone as VerifiedIcon,
  PiSealWarningDuotone as NotVerifiedIcon,
} from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { auth } from "@/services/auth";
import { VerifyVeterinaryModal } from "../modals";

type Props = {
  isLoading: boolean;
  branches?: ClinicBranchItem[];
};

const VetTable = ({ vets }: { vets: ClinicBranchVeterinarianItem[] }) => {
  const [verifyModalVisible, setVerifyModalVisible] = useState<boolean>(false);
  const [sendedEmail, setSendedEmail] = useState<string>("");

  const onVerifyClick = (vetEmail: string) =>
    Promise.resolve(
      auth.signup.resendOtp(vetEmail, (email) => {
        message.success(`Verification email sent to ${email}`);
        setSendedEmail(email);
        setTimeout(() => {
          setVerifyModalVisible(true);
        }, 1000);
      })
    );

  return (
    <>
      <VerifyVeterinaryModal visible={verifyModalVisible} setVisible={setVerifyModalVisible} email={sendedEmail} />
      <List
        dataSource={vets}
        renderItem={(vet) => {
          const isVetAuthorized = vet?.user?.allowed_roles?.includes("vet") && vet?.user?.default_role === "vet";
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

  return (
    <div className="w-full">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table
          dataSource={branches}
          rowKey="id"
          rowClassName="cursor-pointer"
          pagination={false}
          expandable={{
            defaultExpandAllRows: true,
            expandRowByClick: true,
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
                  <Button type="link" disabled={!record.id} onClick={() => {}}>
                    <EditIcon className="w-5 h-5" />
                  </Button>
                  <Button
                    type="link"
                    disabled={!record.address}
                    onClick={() => {
                      window.open(`https://www.google.com/maps/search/${record.address} ${record.city}`, "_blank");
                    }}
                  >
                    <AddressIcon className="w-5 h-5" />
                  </Button>
                  <Button
                    type="link"
                    disabled={!record.phone}
                    onClick={() => {
                      window.open(`tel:${record.phone}`, "_blank");
                    }}
                  >
                    <PhoneIcon className="w-5 h-5" />
                  </Button>
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
};
