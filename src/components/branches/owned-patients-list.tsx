import { useState } from "react";

import {
  PiPlusBold as AddIcon,
  PiPencilSimple as EditIcon,
  PiWhatsappLogo as WhatsappIcon,
  PiEnvelopeSimple as EmailIcon,
} from "react-icons/pi";

import { useQuery } from "@apollo/client";
import { Input, Popover, Table, type TableProps } from "antd";
import { debounce } from "lodash";

import { useAppSelector } from "@/hooks";
import { clinicQueries } from "@/services/apollo/query";

import CustomButton from "../common/custom-button";
import AddClientToBranchModal from "../modals/clinics/add-client-to-branch";
import AddPetToClient from "../modals/clinics/add-pet-to-client";

type Props = {
  href?: string;
};

const OwnedPatientsList: React.FC<Props> = () => {
  const { assignments } = useAppSelector((state) => state.clinic);
  const [currentClientId, setCurrentClientId] = useState<string | undefined>(undefined);

  const [visibleAddClientModal, setVisibleAddClientModal] = useState(false);
  const [visibleAddPetModal, setVisibleAddPetModal] = useState(false);

  const [pagination, setPagination] = useState({ offset: 0, limit: 10 });
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const {
    data: ownedPatientsData,
    refetch: refetchOwnedPatients,
    loading: appLoading,
  } = useQuery(clinicQueries.GetFilteredBranchClientRecords, {
    skip: !assignments.length,
    variables: {
      branchId: assignments[0]?.branch?.id,
      searchTerm: searchTerm ? `%${searchTerm}%` : undefined,
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });

  const columns: TableProps["columns"] = [
    {
      title: "Ad Soyad",
      dataIndex: "client",
      key: "id",
      width: 300,
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
      render(value, record, index) {
        return (
          <div className="flex items-center justify-between gap-2">
            <span>{record?.full_name}</span>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "client",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      render(value, record, index) {
        return <span>{record?.email}</span>;
      },
    },
    {
      title: "Telefon",
      dataIndex: "client",
      key: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      render(value, record, index) {
        return record?.phone ? <span>{record?.phone}</span> : <span className="text-gray-400">-</span>;
      },
    },
    {
      title: "Petler",
      dataIndex: "pet_records",
      key: "pet_records",
      sorter: (a, b) => a.pets.length - b.pets.length,
      render(value, record, index) {
        const isExist = value?.length > 0;
        return isExist ? (
          <div className="flex flex-wrap items-center gap-2">
            {value.map((pet: any) => (
              <div key={pet.id} className="cursor-pointer px-2 py-1 bg-gray-100 rounded-md">
                <span className="text-sm text-gray-900">{pet.name}</span>
              </div>
            ))}
          </div>
        ) : (
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
      <AddClientToBranchModal
        visible={visibleAddClientModal}
        onClose={() => setVisibleAddClientModal(false)}
        onSuccess={(skipPet, ownerId) => {
          refetchOwnedPatients();

          if (skipPet) return;
          setVisibleAddPetModal(true);
          setCurrentClientId(ownerId);
        }}
      />
      <AddPetToClient
        visible={visibleAddPetModal}
        onClose={() => setVisibleAddPetModal(false)}
        data={{
          clients: ownedPatientsData?.records,
          initialClientId: currentClientId,
        }}
        onSuccess={() => refetchOwnedPatients()}
      />
      <div className="flex flex-col gap-4" id="owned-patients-list">
        <Input
          allowClear
          size="large"
          placeholder="Müşteri adı, email ya da pet adı ile ara"
          onChange={(e) => onChangeSearchTerm(e.target.value)}
        />
        <Table
          rowKey="id"
          columns={columns}
          dataSource={ownedPatientsData?.records}
          loading={appLoading}
          pagination={{ pageSize: 10 }}
          title={() => (
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Sahipli Pet Listesi</h2>
                <span className="text-sm text-gray-600">{ownedPatientsData?.records?.length} kayıt bulundu</span>
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

export default OwnedPatientsList;
