"use client";

import React from "react";
import { Breadcrumb, Card } from "antd";
import { BreadcrumbProps } from "antd/lib";
import { AppointmentCalendar, SelectedDayList } from "@/components/appointments";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

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

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-[4fr,1fr] gap-4">
        <Card className="rounded-lg">
          <AppointmentCalendar onSelectDate={setSelectedDate} />
        </Card>
        <SelectedDayList selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default AdminAppointmentsPage;
