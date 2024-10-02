import dayjs from "dayjs";

// in:2024-10-01T16:06:35.819703+00:00 out:19:06
const convertTime = (time: string) => {
  return dayjs(time).format("HH:mm");
};

// in:2024-10-01T16:06:35.819703+00:00 out:01/10 19:06
const convertDateTime = (time: string) => {
  return dayjs(time).format("DD/MM HH:mm");
};

export { convertTime, convertDateTime };
