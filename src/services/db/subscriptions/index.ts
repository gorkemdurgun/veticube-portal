import { GET_DEVICE_DATA } from "./devices";
import { getUsers } from "./users";

export const subscriptions = {
  users: {
    getUsers,
  },
  devices: {
    getDeviceData: GET_DEVICE_DATA,
  },
};
