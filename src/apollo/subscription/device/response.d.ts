type GetDeviceDataRes = {
  logs: {
    device_id: string;
    data: {
      h: number;
      t: number;
    };
    created_at: string;
  }[];
};
