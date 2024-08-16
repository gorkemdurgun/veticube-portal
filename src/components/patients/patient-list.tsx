import { memo } from "react";
import { Divider, Space, Table, Tag, type TableProps } from "antd";
import { CustomButton } from "../common";
import {
  PiCalendarBlank as AppointmentIcon,
  PiWhatsappLogo as WhatsAppIcon,
  PiPencilSimple as EditIcon,
  PiTrash as DeleteIcon,
} from "react-icons/pi";
import dayjs from "dayjs";

type Props = {};

interface DataType {
  key: string;
  owner: {
    id: string;
    name: string;
    phone: string;
  };
  patient: {
    id: string;
    name: string;
    gender: string;
    age: number;
  };
  lastArrival: string;
  nextAppointment: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Owner Name",
    dataIndex: ["owner", "name"],
    key: "ownerName",
    align: "center",
    sorter: (a, b) => a.owner.name.localeCompare(b.owner.name),
  },
  {
    title: "Patient",
    align: "center",
    children: [
      {
        title: "Name",
        dataIndex: ["patient", "name"],
        key: "patientName",
        align: "center",
        sorter: (a, b) => a.patient.name.localeCompare(b.patient.name),
      },
      {
        title: "Age",
        dataIndex: ["patient", "age"],
        key: "patientAge",
        align: "center",
        sorter: (a, b) => a.patient.age - b.patient.age,
      },
      {
        title: "Gender",
        dataIndex: ["patient", "gender"],
        key: "patientGender",
        align: "center",
        sorter: (a, b) => a.patient.gender.localeCompare(b.patient.gender),
        render(value, record, index) {
          return value === "M" ? (
            <Tag className="w-16 text-center" color="blue" key={index}>
              Male
            </Tag>
          ) : (
            <Tag className="w-16 text-center" color="magenta" key={index}>
              Female
            </Tag>
          );
        },
      },
    ],
  },
  {
    title: "Last Arrival",
    dataIndex: "lastArrival",
    key: "lastArrival",
    align: "center",
    sorter: (a, b) => a.lastArrival.localeCompare(b.lastArrival),
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
    sorter: (a, b) => a.nextAppointment.localeCompare(b.nextAppointment),
    render: (value) => (
      <Tag className="w-28 text-center" color="default">
        {dayjs(value).format("DD/MM/YYYY")}
      </Tag>
    ),
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
        <Divider type="vertical" className="mx-0" />
        <CustomButton variant="neutral-text" icon={EditIcon} />
        <Divider type="vertical" className="mx-0" />
        <CustomButton variant="neutral-text" icon={DeleteIcon} />
      </Space>
    ),
  },
];
const data: DataType[] = [
  {
    key: "1",
    owner: {
      id: "1",
      name: "John Doe",
      phone: "1234567890",
    },
    patient: {
      id: "1",
      name: "Max",
      age: 5,
      gender: "M",
    },
    lastArrival: "2021-09-01",
    nextAppointment: "2021-09-15",
  },
  {
    key: "2",
    owner: {
      id: "2",
      name: "Katie Taylor",
      phone: "0987654321",
    },
    patient: {
      id: "2",
      name: "Bella",
      age: 4,
      gender: "F",
    },
    lastArrival: "2021-09-02",
    nextAppointment: "2021-09-16",
  },
];

const Component = (props: Props) => {
  return <Table size="small" rowClassName="cursor-pointer" columns={columns} dataSource={data} />;
};

export const PatientList = memo(Component);
