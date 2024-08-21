"use client";

import { useEffect, useState } from "react";

import { PiPlusCircleDuotone as AddIcon, PiMagnifyingGlassDuotone as ViewIcon } from "react-icons/pi";

import dayjs from "dayjs";

import { svg } from "@/assets";
import { useCustomAppQuery } from "@/hooks";
import { queries } from "@/services/db";
import { chart } from "@/utils";

import PatientList from "@/components/patients/patient-list";
import PatientListHeaderCard from "@/components/patients/patient-list-header-card";
import SearchFilterBox from "@/components/patients/search-filter-box";
import SearchPatientInput from "@/components/patients/search-patient-input";

const PatientsPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [filters, setFilters] = useState<Record<string, string | undefined>>();

  const last7Days = dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const { data } = useCustomAppQuery({
    query: queries.pet.GetClinicPets,
  });
  const { data: chartData } = useCustomAppQuery({
    query: queries.pet.GetRegisteredPatientsChartData,
    options: {
      variables: {
        untilDate: last7Days,
      },
    },
  });

  useEffect(() => {
    // console.log("Search results:", searchResults);
  }, [searchResults]);

  useEffect(() => {
    // console.log("Filters:", filters);
  }, [filters]);

  useEffect(() => {
    // console.log("Chart data:", chartData);
  }, [chartData]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <PatientListHeaderCard
            className="col-span-1 sm:col-span-2 lg:col-span-1"
            image={svg.pack3.AidPaw2}
            label="Total Patients"
            count={chartData?.totalPets.aggregate.count || 0}
            button={{ icon: AddIcon, onClick: () => console.log("Add new patient") }}
            chartData={chart.groupDatesByCount(chartData?.registeredPatients)}
          />
          <PatientListHeaderCard
            className="col-span-1"
            image={svg.pack3.Magnify}
            label="Arrival Today"
            count={4}
            button={{ icon: ViewIcon, onClick: () => console.log("View today's arrivals") }}
          />
          <PatientListHeaderCard
            className="col-span-1"
            image={svg.pack3.Icu}
            label="In ICU"
            count={2}
            button={{ icon: ViewIcon, onClick: () => console.log("View patients in ICU") }}
          />
        </div>
        <div className="overflow-y-auto grid grid-cols-[1fr,240px] gap-4">
          <div className="flex flex-col gap-4">
            <SearchPatientInput onSearchDone={setSearchResults} />
            <PatientList data={data?.pet_list} />
          </div>
          <SearchFilterBox onFilterChange={setFilters} />
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
