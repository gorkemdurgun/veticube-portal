import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type GetDeviceDataResponse = {
  logs: {
    device_id: string;
    data: {
      h: number;
      t: number;
    };
    created_at: string;
  }[];
};

export const GET_DEVICE_DATA: TypedDocumentNode<GetDeviceDataResponse> = gql`
  subscription GetDeviceSnapData($deviceId: String = "") {
    logs: devices_logs(where: { device_id: { _eq: $deviceId } }) {
      device_id
      data
      created_at
    }
  }
`;
