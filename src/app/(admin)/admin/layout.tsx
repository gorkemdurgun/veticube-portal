"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setMode, toggleDarkMode } from "@/redux/slices/themeSlice";
import { Button, Dropdown, Layout, Menu, Switch, Tooltip, theme } from "antd";
import { MenuProps } from "antd/lib";

import {
  PiSquaresFourDuotone as DashboardIcon,
  PiCalendarDotsDuotone as AppointmentsIcon,
  PiPawPrintDuotone as PatientsIcon,
  PiUserCircleDuotone as ClientsIcon,
  PiClockUserDuotone as EmployeesIcon,
  PiStorefrontDuotone as BranchesIcon,
  PiPackageDuotone as StockIcon,
  PiWalletDuotone as AccountingIcon,
  PiGearDuotone as SettingsIcon,
} from "react-icons/pi";
import { MoonOutlined, SunOutlined, DownOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { setLanguage } from "@/redux/slices/languageSlice";
import { Navbar } from "@/components/common";

type MenuItem = Required<MenuProps>["items"][number];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Header, Content, Footer, Sider } = Layout;

  const { t } = useTranslation();

  const items: MenuItem[] = [
    {
      className: "flex items-center justify-center !h-12 py-2 text-lg",
      key: "/admin/overview",
      label: t("sidebar.overview"),
      icon: <DashboardIcon className="w-6 h-6 !-ml-1" />,
      onClick: () => router.push("/admin/overview"),
    },
    {
      className: "!h-12 py-2 text-lg",
      key: "/admin/appointments",
      label: t("sidebar.appointments"),
      icon: <AppointmentsIcon className="w-6 h-6 !-ml-1" />,
      onClick: () => router.push("/admin/appointments"),
    },
    {
      disabled: true,
      className: "!h-12 py-2 text-lg",
      key: "/admin/pets",
      label: t("sidebar.patients"),
      icon: <PatientsIcon className="w-6 h-6 !-ml-1" />,
      onClick: () => router.push("/admin/patients"),
    },
    {
      // disabled: true,
      className: "!h-12 py-2 text-lg",
      key: "/admin/clients",
      label: t("sidebar.clients"),
      icon: <ClientsIcon className="w-6 h-6 !-ml-1" />,
      onClick: () => router.push("/admin/clients"),
    },
    {
      // disabled: true,
      className: "!h-12 py-2 text-lg",
      key: "/admin/employees",
      label: t("sidebar.employees"),
      icon: <EmployeesIcon className="w-6 h-6 !-ml-1" />,
      onClick: () => router.push("/admin/employees"),
    },
    {
      // disabled: true,
      className: "!h-12 py-2 text-lg",
      key: "/admin/branches",
      label: t("sidebar.branches"),
      icon: <BranchesIcon className="w-6 h-6 !-ml-1" />,
      onClick: () => router.push("/admin/branches"),
    },
    {
      disabled: true,
      className: "!h-12 py-2 text-lg",
      key: "/admin/stock",
      label: t("sidebar.stock"),
      icon: <StockIcon className="w-6 h-6 !-ml-1" />,
      onClick: () => router.push("/admin/stock"),
    },
    {
      disabled: true,
      className: "!h-12 py-2 text-lg",
      key: "/admin/accounting",
      label: t("sidebar.accounting"),
      icon: <AccountingIcon className="w-6 h-6 !-ml-1" />,
      onClick: () => router.push("/admin/accounting"),
    },
    {
      disabled: true,
      className: "!h-12 py-2 text-lg",
      key: "/admin/settings",
      label: t("sidebar.settings"),
      icon: <SettingsIcon className="w-6 h-6 !-ml-1" />,
      onClick: () => router.push("/admin/settings"),
    },
  ];

  const dispatch = useAppDispatch();
  const router = useRouter();
  const path = usePathname();

  return (
    <Layout>
      <Navbar />
      <Layout hasSider className="relative min-h-screen">
        <Sider collapsed className="!sticky top-8 h-fit my-8 ml-4 mr-0 rounded-xl">
          <Menu className="p-2 rounded-xl" mode="inline" items={items} selectedKeys={[path]} />
        </Sider>
        <Content>
          <div className="flex h-[200vh] w-full mx-auto gap-4 px-4 py-8">{children}</div>
        </Content>
      </Layout>
      <Footer className="!p-0">
        <div className=" text-center bg-emerald-800 text-white">Footer</div>
      </Footer>
    </Layout>
  );
}
