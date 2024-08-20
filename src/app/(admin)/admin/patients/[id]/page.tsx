"use client";

import { useParams } from "next/navigation";

import { useCustomAppQuery } from "@/hooks";
import { queries } from "@/services/db";

import PatientOverviewCard from "@/components/patients/patient-overview-card";
import PatientWeightHistory from "@/components/patients/patient-weight-history";

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
  const { id: petId } = useParams();

  const { loading, data } = useCustomAppQuery({
    query: queries.pet.GetPetOverview,
    options: { variables: { petId } },
  });
  // console.log("Pet data", data?.pet[0].name);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* <Breadcrumb items={breadcrumbItems} /> */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PatientOverviewCard loading={loading} pet={data?.pet?.[0]} />
        <PatientWeightHistory weightHistory={weightData} />
      </div>
    </div>
  );
};

export default PatientsIDPage;
