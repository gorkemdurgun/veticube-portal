"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleDarkMode } from "@/redux/slices/themeSlice";
import { Button, Dropdown, Layout, Menu, Switch, theme } from "antd";
import { MenuProps } from "antd/lib";

import { PiListDuotone as DashboardIcon, PiCalendarDotsDuotone as AppointmentsIcon } from "react-icons/pi";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { setLanguage } from "@/redux/slices/languageSlice";

type MenuItem = Required<MenuProps>["items"][number];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Header, Content, Footer, Sider } = Layout;

  const { t } = useTranslation();
  const { preferredLanguage } = useAppSelector((state) => state.language);

  const items: MenuItem[] = [
    {
      key: "/admin",
      label: t("sidebar.dashboard"),
      icon: <DashboardIcon className="w-5 h-5" />,
      onClick: () => router.push("/admin"),
    },
    {
      key: "/admin/appointments",
      label: t("sidebar.appointments"),
      icon: <AppointmentsIcon className="w-5 h-5" />,
      onClick: () => router.push("/admin/appointments"),
    },
  ];

  const dispatch = useAppDispatch();
  const router = useRouter();
  const path = usePathname();

  const langItems: MenuProps["items"] = [
    {
      key: "tr",
      label: "Türkçe",
      onClick: () => dispatch(setLanguage({ preferredLanguage: "tr" })),
    },
    {
      key: "en",
      label: "English",
      onClick: () => dispatch(setLanguage({ preferredLanguage: "en" })),
    },
  ];

  return (
    <Layout>
      <Header className="!p-0">
        <div className="flex justify-between items-center bg-green-600  px-[50px]">
          <div className="text-white">e-Treat Admin</div>
          <div className="flex items-center gap-2">
            <Switch checkedChildren={<SunOutlined />} unCheckedChildren={<MoonOutlined />} onChange={() => dispatch(toggleDarkMode())} />
            <Dropdown trigger={["click"]} menu={{ items: langItems, selectedKeys: [preferredLanguage] }}>
              <Button type="primary">{preferredLanguage === "tr" ? "Türkçe" : "English"}</Button>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Layout hasSider>
        <Sider className="overflow-y-auto min-h-screen">
          <Menu
            className="h-full"
            mode="inline"
            items={items}
            // is equal to path === item.key
            selectedKeys={[path]}
          />
        </Sider>
        <Content>
          <div className="flex h-full w-full mx-auto p-4">{children}</div>
        </Content>
      </Layout>
      <Footer className="!p-0">
        <div className=" text-center bg-green-700 text-white">Footer</div>
      </Footer>
    </Layout>
  );
}
