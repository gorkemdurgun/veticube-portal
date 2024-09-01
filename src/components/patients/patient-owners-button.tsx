import { memo } from "react";

import { Popover } from "antd";

import { GetPetOverviewResponse } from "@/services/db/queries/pet";

import CustomButton from "../common/custom-button";

type Props = {
  clientList?: {
    client: {
      id: string;
      user: {
        first_name: string;
        last_name: string;
      };
    };
  }[];
};

const PatientOwnersButton = ({ clientList }: Props) => {
  if (!clientList) return null;
  return clientList.length === 1 ? (
    <CustomButton variant="primary-text" onClick={(e) => e.stopPropagation()}>
      {clientList[0]?.client?.user?.first_name + " " + clientList[0]?.client?.user?.last_name}
    </CustomButton>
  ) : (
    <Popover
      content={
        <div className="flex flex-col items-start gap-2">
          {clientList?.map((client, index) => (
            <CustomButton key={index} variant="primary-text" onClick={(e) => e.stopPropagation()}>
              {client.client.user.first_name + " " + client.client.user.last_name}
            </CustomButton>
          ))}
        </div>
      }
    >
      <CustomButton variant="primary-text" onClick={(e) => e.stopPropagation()}>
        {clientList[0]?.client?.user?.first_name + " " + clientList[0]?.client?.user?.last_name} +{clientList?.length - 1}
      </CustomButton>
    </Popover>
  );
};

export default memo(PatientOwnersButton);
