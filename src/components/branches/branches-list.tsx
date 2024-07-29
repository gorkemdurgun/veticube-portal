import { queries } from "@/services/db";
import { Badge, Button, List, Table, TableProps } from "antd";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { PiPhone as PhoneIcon, PiMapPin as AddressIcon, PiPencilSimple as EditIcon } from "react-icons/pi";
import { useTranslation } from "react-i18next";

type Props = {
  isLoading: boolean;
  branches?: ClinicBranchItem[];
};

const VetTable = ({ vets }: { vets: ClinicBranchVeterinarianItem[] }) => {
  return (
    <List
      dataSource={vets}
      renderItem={(vet) => (
        <List.Item
          className="bg-gray-100 rounded-lg !p-4"
          actions={[
            <Button
              key={vet.vetId}
              disabled={vet?.user?.allowed_roles?.includes("vet")}
              danger={vet?.user?.allowed_roles?.includes("vet") ? false : true}
              className={vet?.user?.allowed_roles?.includes("vet") ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"}
            >
              <span>
                {vet?.user?.allowed_roles?.includes("vet") ? "Have Veterinarian Role" : "Not Have Veterinarian Role"}
                {vet?.user?.allowed_roles?.includes("vet") ? "" : " (Click to Authorize)" || ""}
              </span>
            </Button>,

            <Button
              key={vet.vetId}
              disabled={vet?.user?.is_verified}
              danger={vet?.user?.is_verified ? false : true}
              className={vet?.user?.is_verified ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"}
            >
              <span>
                {vet?.user?.is_verified ? "Verified User" : "Not Verified User"} {vet?.user?.is_verified ? "" : " (Click to Verify)" || ""}
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
                <span className="text-gray-500">{`#${vet?.user?.default_role}`}</span>
              </div>
            }
          />
        </List.Item>
      )}
    />
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
