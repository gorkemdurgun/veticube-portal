import { queries } from "@/services/db";
import { Badge, Button, Descriptions, List, Table, TableProps } from "antd";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { PiPhone as PhoneIcon, PiMapPin as AddressIcon, PiPencilSimple as EditIcon } from "react-icons/pi";
import { useTranslation } from "react-i18next";

type Props = {
  isLoading: boolean;
  branches?: ClinicBranchItem[];
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
            expandRowByClick: true,
            expandedRowRender: (record) => (
              <Descriptions bordered size="small" column={3}>
                <Descriptions.Item label={"Veteriner sayısı"}>{record.veterinarian_count.aggregate.count}</Descriptions.Item>
                <Descriptions.Item label={"x sayısı"}>x</Descriptions.Item>
                <Descriptions.Item label={"x sayısı"}>x</Descriptions.Item>
              </Descriptions>
            ),
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
