import { memo } from "react";


import { PiCalendarBlank as AppointmentIcon, PiWhatsappLogo as WhatsAppIcon } from "react-icons/pi";

import { Divider, Space, Table, Tag, type TableProps } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import { CustomButton } from "../common";


type Props = {
  data?: GetClinicPetsResponse["petList"];
};
type DataType = GetClinicPetsResponse["petList"][number];

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Client",
    align: "center",
    children: [
      {
        title: "Full Name",
        dataIndex: ["client", "user", "first_name"],
        key: "clientName",
        align: "center",
        sorter: (a, b) => a.client.user.first_name.localeCompare(b.client.user.first_name),
        render(value, record, index) {
          return (
            <span key={index} className="text-center">
              {record.client.user.first_name} {record.client.user.last_name}
            </span>
          );
        },
      },
    ],
  },
  {
    title: "Pet",
    align: "center",
    children: [
      {
        title: "Name",
        dataIndex: ["name"],
        key: "name",
        align: "center",
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: "Age",
        dataIndex: ["birth_date"],
        key: "age",
        align: "center",
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
    title: "Action",
    key: "action",
    align: "center",
    render: (_, record) => (
      <Space size="middle">
        <CustomButton variant="primary-text" icon={AppointmentIcon} />
        <Divider type="vertical" className="mx-0" />
        <CustomButton variant="primary-text" icon={WhatsAppIcon} />
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
        pageSize: 10,
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
