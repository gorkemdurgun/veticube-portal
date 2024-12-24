import { useState } from "react";

import {
  PiPlusBold as AddIcon,
  PiPencilSimple as EditIcon,
  PiWhatsappLogo as WhatsappIcon,
  PiEnvelopeSimple as EmailIcon,
} from "react-icons/pi";

import { useQuery } from "@apollo/client";
import { Input, Popover, Table, type TableProps } from "antd";
import dayjs from "dayjs";
import { debounce } from "lodash";

import { useAppSelector } from "@/hooks";
import { clinicQueries } from "@/services/apollo/query";

import CustomButton from "../common/custom-button";
import AddClientToBranchModal from "../modals/clinics/add-client-to-branch";
import AddPetToClient from "../modals/clinics/add-pet-to-client";

type Props = {};

const UnownedPatientsList: React.FC<Props> = () => {
  const { assignments } = useAppSelector((state) => state.clinic);
  const [currentClientId, setCurrentClientId] = useState<string | undefined>(undefined);

  const [visibleAddClientModal, setVisibleAddClientModal] = useState(false);
  const [visibleAddPetModal, setVisibleAddPetModal] = useState(false);

  const [pagination, setPagination] = useState({ offset: 0, limit: 10 });
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const {
    data: unownedPatientsData,
    refetch: refetchUnownedPatients,
    loading: appLoading,
  } = useQuery(clinicQueries.GetUnownedPetRecords, {
    skip: !assignments.length,
    variables: {
      searchTerm: searchTerm ? `%${searchTerm}%` : undefined,
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });

  const columns: TableProps["columns"] = [
    {
      title: "Pet Adı",
      dataIndex: "name",
      key: "name",
      width: 300,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(value, record, index) {
        return (
          <div className="flex items-center justify-between gap-2">
            <span>{record?.name}</span>
          </div>
        );
      },
    },
    {
      title: "Yaş",
      dataIndex: "birthdate",
      key: "birthdate",
      sorter: (a, b) => a.birthdate.localeCompare(b.birthdate),
      render(value, record, index) {
        return value ? <span>{dayjs().diff(dayjs(value), "year")}</span> : <span className="text-gray-400">-</span>;
      },
    },
    {
      title: "Tür",
      dataIndex: "breed_id",
      key: "breed_id",
      sorter: (a, b) => a.breed_id.localeCompare(b.breed_id),
      render(value, record, index) {
        return record?.breed_id ? <span>{record?.breed_id}</span> : <span className="text-gray-400">-</span>;
      },
    },
    {
      title: "Sahip",
      dataIndex: "client",
      key: "client",
      sorter: (a, b) => a.pets.length - b.pets.length,
      render(value, record, index) {
        return (
          <CustomButton
            variant="neutral-faded"
            icon={AddIcon}
            onClick={() => {
              setCurrentClientId(record.id);
              setVisibleAddPetModal(true);
            }}
          />
        );
      },
    },
    {
      title: "",
      key: "actions",
      dataIndex: "id",
      width: 200,
      render(value, record, index) {
        return (
          <div className="flex gap-2">
            <CustomButton disabled={record?.phone ? false : true} size="md" variant="primary-faded" icon={WhatsappIcon} />
            <CustomButton disabled={record?.email ? false : true} size="md" variant="neutral-faded" icon={EmailIcon} />
            <CustomButton size="md" variant="neutral-faded" icon={EditIcon} />
          </div>
        );
      },
    },
  ];

  const onChangeSearchTerm = debounce((value: string) => {
    setSearchTerm(value);
  }, 800);

  return (
    <>
      <div className="flex flex-col gap-4" id="unowned-patients-list">
        <Input
          allowClear
          size="large"
          placeholder="Müşteri adı, email ya da pet adı ile ara"
          onChange={(e) => onChangeSearchTerm(e.target.value)}
        />
        <Table
          rowKey="id"
          columns={columns}
          dataSource={unownedPatientsData?.records}
          loading={appLoading}
          pagination={{ pageSize: 10 }}
          title={() => (
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Sahipsiz Pet Listesi</h2>
                <span className="text-sm text-gray-600">{unownedPatientsData?.records?.length} kayıt bulundu</span>
              </div>
              <div className="flex gap-2">
                <CustomButton variant="secondary-opaque" icon={AddIcon} onClick={() => setVisibleAddClientModal(true)}>
                  Yeni Müşteri
                </CustomButton>
                <CustomButton variant="secondary-opaque" icon={AddIcon} onClick={() => setVisibleAddPetModal(true)}>
                  Yeni Pet
                </CustomButton>
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
};

export default UnownedPatientsList;
