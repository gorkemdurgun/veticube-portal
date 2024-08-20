export const cleanUnderline = (str?: string): string => {
  if (!str) return "";
  return str.replace(/_/g, " ");
};
