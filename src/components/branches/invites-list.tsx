
import { Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import CustomButton from "../common/custom-button";

type Props = {
  isLoading: boolean;
  branches?: {
    id: string;
    branch_name: string;
  }[];
  invitations?: {
    id: string;
    inviter_id: string;
    invitee_email: string;
    branch_id: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
  }[];
};

const InvitesList: React.FC<Props> = ({ isLoading, branches, invitations }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        {/* <TranslatedText className="text-2xl font-semibold" tPrefix="components" tKey="branches.branches-list.list" /> */}
        <h1 className="text-2xl font-semibold">Davet Listesi</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Table
            dataSource={invitations}
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
                title: "Email",
                dataIndex: "invitee_email",
                key: "invitee_email",
                render: (text) => <span>{text}</span>,
              },
              {
                title: "Branch",
                dataIndex: "branch_id",
                key: "branch_id",
                render: (text) => <span>{branches?.find((branch) => branch.id === text)?.branch_name}</span>,
              },
              {
                title: "Role",
                dataIndex: "role",
                key: "role",
                render: (text) => <span>{text}</span>,
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (text) => <span>{text}</span>,
              },
              {
                title: "Gönderilme Tarihi",
                dataIndex: "created_at",
                key: "created_at",
                render: (text) => <span>{dayjs(text).format("DD/MM/YYYY")}</span>,
              },
              {
                title: "İşlem",
                key: "action",
                render: (text, record) => (
                  <div className="flex flex-row gap-2">
                    <Popconfirm icon={null} placement="bottomLeft" title="Bu daveti geri çekmek istediğinize emin misiniz?">
                      <CustomButton variant="neutral-faded">Geri Çek</CustomButton>
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

export default InvitesList;
