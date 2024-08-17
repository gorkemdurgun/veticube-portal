import { memo } from "react";
import { Divider, Space, Table, Tag, type TableProps } from "antd";
import { CustomButton } from "../common";
import { PiCalendarBlank as AppointmentIcon, PiWhatsappLogo as WhatsAppIcon } from "react-icons/pi";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

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
    title: "Owner",
    align: "center",
    children: [
      {
        title: "Full Name",
        dataIndex: ["owner", "name"],
        key: "ownerName",
        align: "center",
        sorter: (a, b) => a.owner.name.localeCompare(b.owner.name),
      },
    ],
  },
  {
    title: "Pet",
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
const data: DataType[] = [
  {
    key: "1",
    owner: {
      id: "1",
      name: "Henry Johnson",
      phone: "1234567890",
    },
    patient: {
      id: "1",
      name: "Esther",
      age: 5,
      gender: "F",
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
  {
    key: "3",
    owner: {
      id: "3",
      name: "Emily Johnson",
      phone: "5551234567",
    },
    patient: {
      id: "3",
      name: "Oliver",
      age: 3,
      gender: "M",
    },
    lastArrival: "2021-09-03",
    nextAppointment: "2021-09-17",
  },
  {
    key: "4",
    owner: {
      id: "4",
      name: "David Miller",
      phone: "5559876543",
    },
    patient: {
      id: "4",
      name: "Klaus",
      age: 2,
      gender: "M",
    },
    lastArrival: "2021-09-04",
    nextAppointment: "2021-09-18",
  },
  {
    key: "5",
    owner: {
      id: "5",
      name: "Sophia Brown",
      phone: "5554567890",
    },
    patient: {
      id: "5",
      name: "Noah",
      age: 6,
      gender: "M",
    },
    lastArrival: "2021-09-05",
    nextAppointment: "2021-09-19",
  },
  {
    key: "6",
    owner: {
      id: "6",
      name: "William Wilson",
      phone: "5557890123",
    },
    patient: {
      id: "6",
      name: "Mia",
      age: 7,
      gender: "F",
    },
    lastArrival: "2021-09-06",
    nextAppointment: "2021-09-20",
  },
  {
    key: "7",
    owner: {
      id: "7",
      name: "Olivia Taylor",
      phone: "5553456789",
    },
    patient: {
      id: "7",
      name: "Seeley",
      age: 5,
      gender: "F",
    },
    lastArrival: "2021-09-07",
    nextAppointment: "2021-09-21",
  },
  {
    key: "8",
    owner: {
      id: "8",
      name: "James Anderson",
      phone: "5556789012",
    },
    patient: {
      id: "8",
      name: "Emma",
      age: 4,
      gender: "F",
    },
    lastArrival: "2021-09-08",
    nextAppointment: "2021-09-22",
  },
  {
    key: "9",
    owner: {
      id: "9",
      name: "Benjamin Thomas",
      phone: "5552345678",
    },
    patient: {
      id: "9",
      name: "Alexander",
      age: 3,
      gender: "M",
    },
    lastArrival: "2021-09-09",
    nextAppointment: "2021-09-23",
  },
  {
    key: "10",
    owner: {
      id: "10",
      name: "Charlotte Harris",
      phone: "5559012345",
    },
    patient: {
      id: "10",
      name: "Abigail",
      age: 2,
      gender: "F",
    },
    lastArrival: "2021-09-10",
    nextAppointment: "2021-09-24",
  },
  {
    key: "11",
    owner: {
      id: "11",
      name: "Lucas Smith",
      phone: "5558765432",
    },
    patient: {
      id: "11",
      name: "Sofia",
      age: 6,
      gender: "F",
    },
    lastArrival: "2021-09-11",
    nextAppointment: "2021-09-25",
  },
];

const Component = (props: Props) => {
  const router = useRouter();

  return (
    <Table
      size="middle"
      rowClassName="cursor-pointer"
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 10,
      }}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            router.push(`patients/${record.patient.id}`);
          },
        };
      }}
    />
  );
};

export const PatientList = memo(Component);
