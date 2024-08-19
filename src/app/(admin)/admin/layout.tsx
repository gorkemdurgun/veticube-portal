"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setMode, toggleDarkMode } from "@/redux/slices/themeSlice";
import { Button, Dropdown, Layout, Menu, Switch, Tooltip, theme } from "antd";
import { MenuProps } from "antd/lib";

import {
  PiSquaresFourDuotone as DashboardIcon,
  PiDeviceTabletDuotone as DevicesIcon,
  PiCalendarDotsDuotone as AppointmentsIcon,
  PiPawPrintDuotone as PatientsIcon,
  PiUserCircleDuotone as ClientsIcon,
  PiClockCounterClockwiseDuotone as TransactionsIcon,
  PiStorefrontDuotone as BranchesIcon,
  PiPackageDuotone as StockIcon,
  PiWalletDuotone as AccountingIcon,
  PiGearDuotone as SettingsIcon,
} from "react-icons/pi";
import { MoonOutlined, SunOutlined, DownOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { setLanguage } from "@/redux/slices/languageSlice";
import { Navbar } from "@/components/common";
import { Router } from "next/router";

type MenuItem = Required<MenuProps>["items"][number];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Header, Content, Footer, Sider } = Layout;

  const { t } = useTranslation();

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      console.log("Route is changing");
    });
    Router.events.on("routeChangeComplete", () => {
      console.log("Route is changed");
    });
    Router.events.on("routeChangeError", () => {
      console.log("Route change error");
    });
  }, []);

  const items: MenuItem[] = [
    {
      type: "item",
      disabled: true,
      className: "!h-12 py-2 text-sm",
      key: "/admin",
      label: t("sidebar.overview"),
      icon: <DashboardIcon className="w-5 h-5 !-ml-1" />,
      onClick: () => router.push("/admin"),
    },
    {
      type: "item",
      disabled: true,
      className: "!h-12 py-2 text-sm",
      key: "/admin/devices",
      label: t("sidebar.devices"),
      icon: <DevicesIcon className="w-5 h-5 !-ml-1" />,
      onClick: () => router.push("/admin/devices"),
    },
    {
      type: "divider",
      className: "!border-gray-200 !my-2",
    },
    {
      type: "item",
      // disabled: true,
      className: "!h-12 py-2 text-sm border-gray-200",
      key: "/admin/appointments",
      label: t("sidebar.appointments"),
      icon: <AppointmentsIcon className="w-5 h-5 !-ml-1" />,
      onClick: () => router.push("/admin/appointments"),
    },
    {
      type: "item",
      // disabled: true,
      className: "!h-12 py-2 text-sm",
      key: "/admin/patients",
      label: t("sidebar.patients"),
      icon: <PatientsIcon className="w-5 h-5 !-ml-1" />,
      onClick: () => router.push("/admin/patients"),
    },
    {
      type: "item",
      disabled: true,
      className: "!h-12 py-2 text-sm",
      key: "/admin/clients",
      label: t("sidebar.clients"),
      icon: <ClientsIcon className="w-5 h-5 !-ml-1" />,
      onClick: () => router.push("/admin/clients"),
    },
    {
      type: "divider",
      className: "!border-gray-200 !my-2",
    },
    {
      type: "item",
      // disabled: true,
      className: "!h-12 py-2 text-sm",
      key: "/admin/branches",
      label: t("sidebar.branches"),
      icon: <BranchesIcon className="w-5 h-5 !-ml-1" />,
      onClick: () => router.push("/admin/branches"),
    },
    {
      type: "item",
      disabled: true,
      className: "!h-12 py-2 text-sm",
      key: "/admin/stock",
      label: t("sidebar.stock"),
      icon: <StockIcon className="w-5 h-5 !-ml-1" />,
      onClick: () => router.push("/admin/stock"),
    },
    {
      type: "item",
      disabled: true,
      className: "!h-12 py-2 text-sm",
      key: "/admin/accounting",
      label: t("sidebar.accounting"),
      icon: <AccountingIcon className="w-5 h-5 !-ml-1" />,
      onClick: () => router.push("/admin/accounting"),
    },
    {
      type: "item",
      disabled: true,
      className: "!h-12 py-2 text-sm",
      key: "/admin/settings",
      label: t("sidebar.settings"),
      icon: <SettingsIcon className="w-5 h-5 !-ml-1" />,
      onClick: () => router.push("/admin/settings"),
    },
  ];

  const dispatch = useAppDispatch();
  const router = useRouter();
  const path = usePathname();

  return (
    <Layout>
      <Navbar />
      <Layout hasSider className="relative min-h-screen bg-gray-50">
        <Sider collapsedWidth={100} className="!sticky top-8 h-fit my-8 ml-4 mr-0 rounded-2xl">
          <Menu className="p-2 rounded-xl" mode="inline" items={items} selectedKeys={[path]} />
        </Sider>
        <Content>
          <div className="flex h-[200vh] mx-auto gap-4 px-4 py-8">{children}</div>
        </Content>
      </Layout>
      <Footer className="!p-0">
        <div className=" text-center bg-emerald-800 text-white">Footer</div>
      </Footer>
    </Layout>
  );
}
