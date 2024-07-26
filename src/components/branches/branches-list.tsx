import { queries } from "@/services/db";
import { Button, Descriptions, Table, TableProps } from "antd";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { PiPhone as PhoneIcon, PiMapPin as AddressIcon, PiPencilSimple as EditIcon } from "react-icons/pi";

type Props = {
  isLoading: boolean;
  branches?: ClinicBranchItem[];
};

export const BranchesList: React.FC<Props> = ({ isLoading, branches }) => {
  return (
    <div className="w-full">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table
          dataSource={branches}
          rowKey="id"
          pagination={false}
          columns={[
            {
              title: "Branch Name",
              dataIndex: "branch_name",
              key: "branch_name",
              render: (name: string) => <strong>{name}</strong>,
            },
            {
              title: "Address",
              dataIndex: "address",
              key: "address",
              render: (address: string) => <span>{address || "-"}</span>,
            },
            {
              title: "City",
              dataIndex: "city",
              key: "city",
              render: (city: string) => <span>{city || "-"}</span>,
            },
            {
              title: "Phone",
              dataIndex: "phone",
              key: "phone",
              render: (phone: string) => <span>{phone || "-"}</span>,
            },
            {
              title: "",
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
