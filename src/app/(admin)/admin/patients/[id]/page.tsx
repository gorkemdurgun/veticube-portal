"use client";

import { ComponentCard, CustomButton, TranslatedText } from "@/components/common";
import { PatientOverviewCard, PatientWeightHistory } from "@/components/patients";
import { Breadcrumb, BreadcrumbProps, Button } from "antd";

const weightData = [
  {
    date: "2021-01-01",
    weight: 4.1,
    range: [4, 4.6],
  },
  {
    date: "2021-01-02",
    weight: 4.2,
    range: [4, 4.6],
  },
  {
    date: "2021-01-03",
    weight: 3.9,
    range: [4, 4.6],
  },
  {
    date: "2021-01-04",
    weight: 4.0,
    range: [4, 4.6],
  },
  {
    date: "2021-01-05",
    weight: 4.1,
    range: [4, 4.6],
  },
  {
    date: "2021-01-06",
    weight: 4.2,
    range: [4, 4.6],
  },
  {
    date: "2021-01-07",
    weight: 4.3,
    range: [4, 5],
  },
  {
    date: "2021-01-08",
    weight: 4.6,
    range: [4, 5],
  },
];

const PatientsIDPage = () => {
  const breadcrumbItems: BreadcrumbProps["items"] = [
    {
      title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
    },
    {
      title: <TranslatedText tPrefix="breadcrumb" tKey="patients" />,
    },
    {
      title: <span>Hasta 1</span>,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* <Breadcrumb items={breadcrumbItems} /> */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PatientOverviewCard />
        <PatientWeightHistory weightHistory={weightData} />
      </div>
    </div>
  );
};

export default PatientsIDPage;
