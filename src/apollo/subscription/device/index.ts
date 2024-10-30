import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export const GET_DEVICE_DATA: TypedDocumentNode<GetDeviceDataRes, GetDeviceDataVar> = gql`
  subscription GetDeviceSnapData($deviceId: String = "") {
    logs: devices_logs(where: { device_id: { _eq: $deviceId } }) {
      device_id
      data
      created_at
    }
  }
`;
