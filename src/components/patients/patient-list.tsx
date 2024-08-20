import { memo } from "react";

import { PiCalendarBlank as AppointmentIcon, PiWhatsappLogo as WhatsAppIcon } from "react-icons/pi";

import { Divider, Popover, Space, Table, Tag, type TableProps } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import type { GetClinicPetsResponse } from "@/services/db/queries/pet/getClinicPets";

import PatientOwnersButton from "./patient-owners-button";

import { CustomButton } from "../common";

type Props = {
  data?: GetClinicPetsResponse["pet_list"];
};
type DataType = GetClinicPetsResponse["pet_list"][number];

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Clients",
    align: "center",
    children: [
      {
        title: "Full Name",
        dataIndex: ["pet_clients", 0, "client", "user", "first_name"],
        key: "client",
        align: "center",
        sorter: (a, b) => a.pet_clients[0].client.user.first_name.localeCompare(b.pet_clients[0].client.user.first_name),
        render(value, record, index) {
          return record.pet_clients.length > 1 ? (
            <PatientOwnersButton clientList={record.pet_clients} />
          ) : (
            <CustomButton variant="primary-text" onClick={(e) => e.stopPropagation()}>
              {record.pet_clients[0]?.client?.user?.first_name + " " + record.pet_clients[0]?.client?.user?.last_name}
            </CustomButton>
          );
        },
      },
    ],
  },
  {
    title: "Pet",

    children: [
      {
        title: "Name",
        dataIndex: ["name"],
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: "Age",
        dataIndex: ["birth_date"],
        key: "age",

        sorter: (a, b) => a.birth_date.localeCompare(b.birth_date),
        render(value, record, index) {
          return (
            <Tag className="w-16 text-center" color="default" key={index}>
              {dayjs().diff(dayjs(value), "year")} y {dayjs().diff(dayjs(value), "month") % 12} m
            </Tag>
          );
        },
      },
      {
        title: "Gender",
        dataIndex: ["gender"],
        key: "gender",
        align: "center",
        sorter: (a, b) => a.gender.localeCompare(b.gender),
        render(value, record, index) {
          return (
            <Tag className="w-8 text-center" color="default" key={index}>
              {value}
            </Tag>
          );
        },
      },
    ],
  },
  {
    title: "Appointment",
    align: "center",
    children: [
      {
        title: "Last Arrival",
        dataIndex: "lastArrival",
        key: "lastArrival",
        align: "center",
        // sorter: (a, b) => a.lastArrival.localeCompare(b.lastArrival),
        render: (value) => (
          <Tag className="w-28 text-center" color="default">
            {dayjs(value).format("DD/MM/YYYY")}
          </Tag>
        ),
      },
      {
        title: "Next Appointment",
        dataIndex: "nextAppointment",
        key: "nextAppointment",
        align: "center",
        // sorter: (a, b) => a.nextAppointment.localeCompare(b.nextAppointment),
        render: (value) => (
          <Tag className="w-28 text-center" color="default">
            {dayjs(value).format("DD/MM/YYYY")}
          </Tag>
        ),
      },
    ],
  },
  {
    title: "Actions",
    key: "actions",
    align: "center",
    render: (_, record) => (
      <Space size="middle">
        <CustomButton variant="primary-text" icon={AppointmentIcon} />
        {/* <Divider type="vertical" className="mx-0" /> */}
        {/* <CustomButton variant="primary-text" icon={WhatsAppIcon} /> */}
      </Space>
    ),
  },
];

const PatientList = ({ data }: Props) => {
  const router = useRouter();
  // console.log(data);

  return (
    <Table
      size="middle"
      rowClassName="cursor-pointer"
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={{
        responsive: true,
        simple: true,
        hideOnSinglePage: true,
        position: ["bottomRight"],
        pageSize: 3,
        showTotal: (total, range) => <span>{`${range[0]}-${range[1]} of ${total} items`}</span>,
      }}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            router.push(`patients/${record.id}`);
          },
        };
      }}
    />
  );
};

export default memo(PatientList);
