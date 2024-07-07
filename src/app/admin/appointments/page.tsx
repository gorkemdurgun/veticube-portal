"use client";

import React, { useEffect } from "react";
import { Breadcrumb, Card } from "antd";
import { BreadcrumbProps } from "antd/lib";
import { AppointmentCalendar, SelectedDayList } from "@/components/appointments";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const appointmentList: Appointment[] = [
  {
    id: "1",
    appointmentDate: "2024-07-01",
    appointmentTime: "09:00",
    clinicBranchId: "1",
    veterinarianId: "1",
    petId: "1",
    staffId: "1",
    type: "surgery",
    status: "rescheduled",
    notes: "Surgery",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    id: "2",
    appointmentDate: "2024-07-03",
    appointmentTime: "11:00",
    clinicBranchId: "1",
    veterinarianId: "1",
    petId: "1",
    staffId: "1",
    type: "check",
    status: "scheduled",
    notes: "Check",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    id: "3",
    appointmentDate: "2024-07-03",
    appointmentTime: "12:30",
    clinicBranchId: "1",
    veterinarianId: "1",
    petId: "1",
    staffId: "1",
    type: "surgery",
    status: "cancelled",
    notes: "Surgery",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    id: "4",
    appointmentDate: "2024-07-03",
    appointmentTime: "14:00",
    clinicBranchId: "1",
    veterinarianId: "1",
    petId: "1",
    staffId: "1",
    type: "vaccination",
    status: "completed",
    notes: "Check",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    id: "5",
    appointmentDate: "2024-07-03",
    appointmentTime: "15:00",
    clinicBranchId: "1",
    veterinarianId: "1",
    petId: "1",
    staffId: "1",
    type: "vaccination",
    status: "rescheduled",
    notes: "Vaccine",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    id: "6",
    appointmentDate: "2024-07-03",
    appointmentTime: "16:30",
    clinicBranchId: "1",
    veterinarianId: "1",
    petId: "1",
    staffId: "1",
    type: "other",
    status: "scheduled",
    notes: "Other",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    id: "7",
    appointmentDate: "2024-07-15",
    appointmentTime: "10:00",
    clinicBranchId: "1",
    veterinarianId: "1",
    petId: "1",
    staffId: "1",
    type: "vaccination",
    status: "scheduled",
    notes: "Vaccine",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    id: "8",
    appointmentDate: "2024-07-15",
    appointmentTime: "10:30",
    clinicBranchId: "1",
    veterinarianId: "1",
    petId: "1",
    staffId: "1",
    type: "vaccination",
    status: "scheduled",
    notes: "Vaccine",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    id: "9",
    appointmentDate: "2024-07-15",
    appointmentTime: "13:30",
    clinicBranchId: "1",
    veterinarianId: "1",
    petId: "1",
    staffId: "1",
    type: "check",
    status: "scheduled",
    notes: "Other",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },

  {
    id: "10",
    appointmentDate: "2024-07-10",
    appointmentTime: "14:00",
    clinicBranchId: "1",
    veterinarianId: "1",
    petId: "1",
    staffId: "1",
    type: "vaccination",
    status: "completed",
    notes: "Check",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    id: "11",
    appointmentDate: "2024-07-15",
    appointmentTime: "15:00",
    clinicBranchId: "1",
    veterinarianId: "1",
    petId: "1",
    staffId: "1",
    type: "grooming",
    status: "scheduled",
    notes: "Vaccine",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    id: "12",
    appointmentDate: "2024-07-15",
    appointmentTime: "16:30",
    clinicBranchId: "1",
    veterinarianId: "1",
    petId: "1",
    staffId: "1",
    type: "other",
    status: "scheduled",
    notes: "Other",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
];

const AdminAppointmentsPage: React.FC = () => {
  const { t } = useTranslation();
  const breadcrumbItems: BreadcrumbProps["items"] = [
    {
      title: t("breadcrumb.panel"),
    },
    {
      title: t("breadcrumb.appointments"),
    },
  ];

  const [selectedDate, setSelectedDate] = React.useState<string>(dayjs().format("DD/MM/YYYY"));
  const [selectedDateAppointments, setSelectedDateAppointments] = React.useState<Appointment[]>([]);

  useEffect(() => {
    setSelectedDateAppointments(
      appointmentList.filter((appointment) => dayjs(appointment.appointmentDate).format("DD/MM/YYYY") === selectedDate)
    );
  }, [selectedDate]);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex flex-row gap-4">
        <Card className="rounded-lg">
          <AppointmentCalendar appointments={appointmentList} onSelectDate={setSelectedDate} />
        </Card>
        <SelectedDayList selectedDate={selectedDate} selectedDateAppointments={selectedDateAppointments} />
      </div>
    </div>
  );
};

export default AdminAppointmentsPage;
