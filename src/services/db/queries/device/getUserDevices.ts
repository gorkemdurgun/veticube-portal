import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type GetUserDevicesResponse = {
  devices: {
    id: string;
    device_id: string;
  }[];
};

export const GET_USER_DEVICES: TypedDocumentNode<GetUserDevicesResponse> = gql`
  query GetUserDevices {
    devices: devices_user_devices {
      id
      device_id
    }
  }
`;
