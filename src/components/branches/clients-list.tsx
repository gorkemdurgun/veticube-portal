import { useState } from "react";

import { useQuery } from "@apollo/client";
import { Popover, Table, type TableProps } from "antd";

import { useAppSelector } from "@/hooks";
import { clinicQueries } from "@/services/apollo/query";

import CustomButton from "../common/custom-button";
import AddClientToBranchModal from "../modals/clinics/add-client-to-branch";
import AddPetToClient from "../modals/clinics/add-pet-to-client";

type Props = {};

const ClientsList: React.FC<Props> = () => {
  const { assignments } = useAppSelector((state) => state.user);
  const [currentClientId, setCurrentClientId] = useState<string | undefined>(undefined);

  const [visibleAddClientModal, setVisibleAddClientModal] = useState(false);
  const [visibleAddPetModal, setVisibleAddPetModal] = useState(false);

  const { data: clientsData, refetch: refetchClients, loading: appLoading } = useQuery(clinicQueries.GetBranchClientRecords);

  const columns: TableProps["columns"] = [
    {
      title: "Ad Soyad",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["xl"],
    },
    {
      title: "Telefon",
      dataIndex: "phone_number",
      key: "phone_number",
      render(value, record, index) {
        return value || "-";
      },
    },
    {
      title: "Petler",
      dataIndex: "pets",
      key: "pets",
      render(value, record, index) {
        const isExist = value?.length > 0;
        return isExist ? (
          value.length > 1 ? (
            <Popover
              trigger={"click"}
              placement="bottom"
              className="cursor-pointer text-blue-700"
              content={
                <div className="flex flex-col gap-2">
                  {value.map((pet: any) => (
                    <a key={pet.id} className="block text-blue-700 hover:text-blue-500">
                      • {pet.name}
                    </a>
                  ))}
                </div>
              }
            >
              {value[0]?.name} +{value.length - 1}
            </Popover>
          ) : (
            <a className="block text-blue-700 hover:text-blue-500">{value[0]?.name}</a>
          )
        ) : (
          "-"
        );
      },
    },
    {
      title: "İşlem",
      dataIndex: "id",
      key: "id",
      render(value, record, index) {
        return (
          <CustomButton
            variant="secondary-faded"
            onClick={() => {
              setCurrentClientId(record.id);
              setVisibleAddPetModal(true);
            }}
          >
            Pet Ekle
          </CustomButton>
        );
      },
    },
  ];

  return (
    <>
      <AddClientToBranchModal
        visible={visibleAddClientModal}
        onClose={() => setVisibleAddClientModal(false)}
        onSuccess={(skipPet, ownerId) => {
          refetchClients();

          if (skipPet) return;
          setVisibleAddPetModal(true);
          setCurrentClientId(ownerId);
        }}
      />
      <AddPetToClient
        visible={visibleAddPetModal}
        onClose={() => setVisibleAddPetModal(false)}
        data={{
          clients: clientsData?.branch_clients,
          initialClientId: currentClientId,
        }}
        onSuccess={() => refetchClients()}
      />
      <Table
        columns={columns}
        dataSource={clientsData?.branch_clients}
        rowKey="id"
        loading={appLoading}
        title={() => (
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Müşteriler</h2>
            <div className="flex gap-2">
              <CustomButton variant="secondary-opaque" onClick={() => setVisibleAddClientModal(true)}>
                Yeni Müşteri Ekle
              </CustomButton>
            </div>
          </div>
        )}
      />
    </>
  );
};

export default ClientsList;
