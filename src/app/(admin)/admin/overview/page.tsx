"use client";

import { TranslatedText } from "@/components/common";
import { useSubscription } from "@apollo/client";
import { Breadcrumb, BreadcrumbProps } from "antd";
import { useTranslation } from "react-i18next";

const AdminOverviewPage = () => {
  const breadcrumbItems: BreadcrumbProps["items"] = [
    {
      title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
    },
    {
      title: <TranslatedText tPrefix="breadcrumb" tKey="devices" />,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default AdminOverviewPage;
