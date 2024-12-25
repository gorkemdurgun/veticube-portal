type GetIotEventLogsRes = {
  iot_event_logs: {
    id: string;
    timestamp: string;
    device_id: string;
    user_id: string | null;
    event_data: {
      target: {
        [key: string]: number;
      };
    };
  }[];
  iot_event_logs_length: {
    aggregate: {
      count: number;
    };
  };
};
type GetIotDeviceByIdRes = {
  device: {
    device_type: string;
    device_model: string;
    assignments: {
      device_nickname: string;
    }[];
  };
};