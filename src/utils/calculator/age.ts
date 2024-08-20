import dayjs from "dayjs";

// if birthDate like "2021-01-01" then return "1y 2m"
export const spesificAge = (birthDate?: string) => {
  if (!birthDate) return "";
  const now = dayjs();
  const birth = dayjs(birthDate);
  const diff = now.diff(birth, "month");
  const year = Math.floor(diff / 12);
  const month = diff % 12;
  return `${year}y ${month}m`;
};
