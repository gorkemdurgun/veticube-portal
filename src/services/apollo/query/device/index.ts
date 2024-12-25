import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export const GET_IOT_EVENT_LOGS: TypedDocumentNode<GetIotEventLogsRes, GetIotEventLogsVar> = gql`
  query GetIotEventLogs($limit: Int = 10, $offset: Int = 0) {
    iot_event_logs: iot_management_iot_event_logs(limit: $limit, offset: $offset, order_by: { timestamp: desc }) {
      event_data
      timestamp
      device_id
      id
      user_id
    }
    iot_event_logs_length: iot_management_iot_event_logs_aggregate {
      aggregate {
        count
      }
    }
  }
`;
export const GET_IOT_DEVICE_BY_ID: TypedDocumentNode<GetIotDeviceByIdRes, GetIotDeviceByIdVar> = gql`
  query GetIotDeviceById($id: uuid = "") {
    device: iot_management_iot_devices_by_pk(id: $id) {
      device_type
      device_model
      assignments {
        device_nickname
      }
    }
  }
`;
