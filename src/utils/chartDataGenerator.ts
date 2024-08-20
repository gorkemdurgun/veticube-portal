type Data = {
  created_at: string;
};
type GroupedData = {
  [key: string]: Data[];
};

// Veriyi gruplama fonksiyonu
const groupByDate = (data: Data[]): GroupedData => {
  return data.reduce((acc: GroupedData, patient: Data) => {
    const date = new Date(patient.created_at).toISOString().split("T")[0]; // YYYY-MM-DD formatında tarih
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(patient);
    return acc;
  }, {});
};

const groupDatesByCount = (data?: Data[]): { 
  date: string; value: number }[] | undefined => {
  if (!data) return undefined;
  const groupedData = groupByDate(data);
  return Object.keys(groupedData).map((date) => ({
    date,
    value: groupedData[date].length,
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const chartDataGenerator = {
  groupDatesByCount,
};
