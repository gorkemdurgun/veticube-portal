"use client";

import React from "react";
import { Badge, Breadcrumb, Calendar, Card } from "antd";
import { BreadcrumbProps } from "antd/lib";
import { AppointmentCalendar } from "@/components/appointments";

const AdminAppointmentsPage: React.FC = () => {
  const breadcrumbItems: BreadcrumbProps["items"] = [
    {
      title: "Admin",
    },
    {
      title: "Appointments",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <Card>
        <AppointmentCalendar />
      </Card>
    </div>
  );
};

export default AdminAppointmentsPage;
