import dayjs from "dayjs";

// in:2024-10-01T16:06:35.819703+00:00 out:19:06
const convertTime = (time: string) => {
  return dayjs(time).format("HH:mm");
};

export { convertTime };
