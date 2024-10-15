import { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { queries } from "@/services/db";

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

  const { data, loading: isLoading, error } = useQuery(queries.settings.GetMyInvites);

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
                  <Popconfirm icon={null} placement="bottomLeft" title="Daveti geri çevirmek istediğinize emin misiniz?">
                    <CustomButton variant="neutral-text">Geri Çevir</CustomButton>
                  </Popconfirm>
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
