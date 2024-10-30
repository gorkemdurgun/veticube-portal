
import { message, Spin } from "antd";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateEmployeeInviteRequest } from "@/redux/slices/clinic/clinicSlice";


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
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { loading: clinicLoading } = useAppSelector((state) => state.clinic);

  /*
  const {
    data: invitesData,
    loading: invitesLoading,
    error: invitesError,
    refetch: invitesRefetch,
  } = useQuery(queries.settings.GetMyInvites, {
    // skip: user.role !== "user"
  });
  */

  let loading = clinicLoading;
  // const loading = clinicLoading || invitesLoading;

  const handleUpdateInvite = async (id: string, status: "accepted" | "rejected") => {
    dispatch(
      updateEmployeeInviteRequest({
        inviteId: id,
        status,
        onSuccess() {
          // invitesRefetch();
        },
        onError(error) {
          message.error(error);
        },
      })
    );
  };

  /*
  if (invitesError) {
    console.error(invitesError);
  }
  */

  return (
    <Spin spinning={loading}>
      {/* <Table
        dataSource={invitesData?.invites}
        rowKey="id"
        loading={loading}
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
                <CustomButton disabled={loading} variant="primary-text" onClick={() => handleUpdateInvite(record.id, "accepted")}>
                  Kabul Et
                </CustomButton>
                <Popconfirm
                  icon={null}
                  placement="bottomLeft"
                  title="Daveti geri çevirmek istediğinize emin misiniz?"
                  onConfirm={() => handleUpdateInvite(record.id, "rejected")}
                >
                  <CustomButton disabled={loading} variant="neutral-text">
                    Geri Çevir
                  </CustomButton>
                </Popconfirm>
              </div>
            ),
          },
        ]}
      /> */}
    </Spin>
  );
};

export default MyInvites;
