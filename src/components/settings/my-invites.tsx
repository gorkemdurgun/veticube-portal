import { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { message, Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { queries } from "@/services/db";
import { updateIncomingInvite } from "@/services/db/mutations/settings";

import { TranslatedText } from "../common";
import CustomButton from "../common/custom-button";

type Props = {};

/*
invites: clinic_management_invitations {
      id
      invitee_email
      role
      created_at
      branch {
        branch_name
      }
    }
*/

const MyInvites: React.FC<Props> = () => {
  const { t } = useTranslation();

  const { data, loading: isLoading, error, refetch } = useQuery(queries.settings.GetMyInvites);

  const handleUpdateInvite = async (id: string, status: string) => {
    updateIncomingInvite(id, status)
      .then((data) => {
        const status = data?.update_clinic_management_invitations_by_pk.status;
        if (status === "accepted") {
          message.success("Davet kabul edildi");
        } else {
          message.success("Davet reddedildi");
        }
      })
      .catch((error) => {
        message.error("Bir hata oluştu");
      })
      .finally(() => {
        refetch();
      });
  };

  if (error) {
    console.error(error);
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        {/* <TranslatedText className="text-2xl font-semibold" tPrefix="components" tKey="branches.branches-list.list" /> */}
        <h1 className="text-2xl font-semibold">Davet Listesi</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Table
            dataSource={data?.invites}
            rowKey="id"
            rowClassName="cursor-pointer"
            pagination={false}
            expandable={{
              expandRowByClick: true,
              // rowExpandable: (record) => record.veterinarians.length > 0,
              // defaultExpandedRowKeys: branches?.filter((branch) => branch.veterinarians.length > 0).map((branch) => branch.id),
              // expandedRowRender: (record) => <VetTable vets={record.veterinarians} />,
            }}
            columns={[
              {
                title: "Davetli",
                dataIndex: "invitee_email",
                key: "invitee_email",
                render: (text) => <span>{text}</span>,
              },
              {
                title: "Şube",
                dataIndex: "branch",
                key: "branch",
                render: (text) => <span>{text.branch_name}</span>,
              },
              {
                title: "Rol",
                dataIndex: "role",
                key: "role",
                render: (text) => <span>{text}</span>,
              },
              {
                title: "Davet Tarihi",
                dataIndex: "created_at",
                key: "created_at",
                render: (text) => <span>{dayjs(text).format("DD.MM.YYYY")}</span>,
              },
              {
                title: "İşlem",
                key: "action",
                render: (text, record) => (
                  <div className="flex gap-2">
                    <CustomButton loading={isLoading} variant="primary-text" onClick={() => handleUpdateInvite(record.id, "accepted")}>
                      Kabul Et
                    </CustomButton>
                    <Popconfirm icon={null} placement="bottomLeft" title="Daveti geri çevirmek istediğinize emin misiniz?"
                        onConfirm={() => handleUpdateInvite(record.id, "rejected")}
                        
                    >
                      <CustomButton loading={isLoading} variant="neutral-text">
                        Geri Çevir
                      </CustomButton>
                    </Popconfirm>
                  </div>
                ),
              },
            ]}
          />
        )}
      </div>
    </>
  );
};

export default MyInvites;
