import { useEffect, useState } from "react";

import {
  PiUserCirclePlus as AddUserIcon,
  PiPhone as PhoneIcon,
  PiMapPin as AddressIcon,
  PiPencilSimple as EditIcon,
  PiSealCheckDuotone as VerifiedIcon,
  PiSealWarningDuotone as NotVerifiedIcon,
} from "react-icons/pi";

import { Badge, Button, Divider, Dropdown, List, message, Popconfirm, Table, Tooltip, Input, Select, AutoComplete, Descriptions } from "antd";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/hooks";
import { auth } from "@/services/cognito";
import { mutations, queries } from "@/services/db";

import type { AutoCompleteProps, TableProps } from "antd";

import { TranslatedText } from "../common";
import CustomButton from "../common/custom-button";
import { AddVeterinaryModal, VerifyUserModal } from "../modals";

type Props = {
  isLoading: boolean;
  branches?: {
    id: string;
    branch_name: string;
    phone_number: string;
    city: string;
    address: string;
    employees: {
      user_id: string;
      role: string;
    }[];
  }[];
};

const roleOptions: { label: string; value: UserRole }[] = [
  { label: "Veteriner", value: "veterinarian" },
  { label: "Hemşire", value: "nurse" },
  { label: "Sekreter", value: "secretary" },
];

const BranchesListFooter: React.FC<Props> = ({ isLoading, branches }) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);

  const [invite, setInvite] = useState<{
    branchId: string | undefined;
    email: string;
    role: UserRole;
  }>({
    branchId: undefined,
    email: "",
    role: roleOptions[0].value,
  });
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<AutoCompleteProps["options"]>([]);

  const clearInvite = () => {
    setInvite({
      branchId: undefined,
      email: "",
      role: roleOptions[0].value,
    });
  };
  const handleSearch = (value: string) => {
    setAutoCompleteOptions(() => {
      if (!value || value.includes("@")) {
        return [];
      }
      return ["gmail.com", "hotmail.com", "outlook.com"].map((domain) => ({
        label: `${value}@${domain}`,
        value: `${value}@${domain}`,
      }));
    });
  };
  const handleInviteUser = () => {
    if (!user || !invite.branchId || !invite.email || !invite.role) {
      message.error("Davet gönderilemedi");
      return;
    }

    mutations.clinics
      .sendEmployeeInvite(user?.id, invite.email, invite.branchId, invite.role)
      .then((data) => {
        message.success(`Kullanıcı daveti gönderildi: ${data?.insert_clinic_management_invitations_one?.invitee_email}`);
      })
      .catch((error) => {
        if (error.message.includes("unique constraint")) {
          message.error("Bu email adresine sahip bir kullanıcı zaten davet edilmiş");
        } else {
          message.error("Davet gönderilemedi");
        }
      }).finally(() => {
        clearInvite();
      }
    );
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex flex-row items-center">
        <span className="text-gray-500">Şube</span>
        <Divider type="vertical" className="mx-2" />
        <Select
          className="min-w-[200px]"
          options={branches?.map((branch) => ({ label: branch.branch_name, value: branch.id }))}
          placeholder="Şube seçin"
          defaultValue={undefined}
          value={invite.branchId}
          onChange={(value) => setInvite({ ...invite, branchId: value })}
          labelRender={(props) => <span>{props.label}</span>}
        />
      </div>
      <div className="flex flex-row items-center">
        <span className="text-gray-500">Email</span>
        <Divider type="vertical" className="mx-2" />
        <AutoComplete
          className="w-[280px]"
          placeholder="Çalışanın email adresini girin"
          value={invite.email}
          onChange={(value) => setInvite({ ...invite, email: value })}
          options={autoCompleteOptions}
          onSearch={handleSearch}
        />
      </div>
      <div className="flex flex-row items-center">
        <span className="text-gray-500">Rol</span>
        <Divider type="vertical" className="mx-2" />
        <Select
          className="min-w-32"
          placement="bottomRight"
          options={roleOptions}
          value={invite.role}
          onChange={(value) => setInvite({ ...invite, role: value })}
          labelRender={(props) => <span>{props.label}</span>}
        />
      </div>
      <Popconfirm
        icon={null}
        placement="bottomLeft"
        onConfirm={handleInviteUser}
        title={() => (
          <Descriptions bordered column={1} size="small" className="max-w-[300px]">
            <Descriptions.Item label="Email">{invite.email}</Descriptions.Item>
            <Descriptions.Item label="Şube">{branches?.find((branch) => branch.id === invite.branchId)?.branch_name}</Descriptions.Item>
            <Descriptions.Item label="Rol">{roleOptions.find((role) => role.value === invite.role)?.label}</Descriptions.Item>
          </Descriptions>
        )}
      >
        <CustomButton disabled={!invite.branchId || !invite.email || !invite.role} variant="primary-faded" className="px-8">
          Davet Gönder
        </CustomButton>
      </Popconfirm>
    </div>
  );
};

export default BranchesListFooter;
