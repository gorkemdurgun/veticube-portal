import { DownOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Layout, Spin, Tooltip } from "antd";
import Image from "next/image";

import { png } from "@/assets";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setActiveBranchRequest } from "@/redux/slices/app/appSlice";
import { setLanguage } from "@/redux/slices/language/languageSlice";
import { setMode } from "@/redux/slices/theme/themeSlice";

import { UserAvatar } from "./user-avatar";

import type { MenuProps } from "antd";

export const Navbar: React.FC = () => {
  const { Header } = Layout;
  const langItems: MenuProps["items"] = [
    {
      key: "tr",
      label: "Türkçe",
      onClick: () => dispatch(setLanguage("tr")),
    },
    {
      key: "en",
      label: "English",
      onClick: () => dispatch(setLanguage("en")),
    },
  ];
  const themeItems: MenuProps["items"] = [
    {
      key: "dark",
      label: "Dark",
      onClick: () => dispatch(setMode(true)),
    },
    {
      key: "light",
      label: "Light",
      onClick: () => dispatch(setMode(false)),
    },
  ];

  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.theme);
  const { language } = useAppSelector((state) => state.lang);
  const { assignments } = useAppSelector((state) => state.user);
  const { activeBranch, loading: appLoading } = useAppSelector((state) => state.app);

  return (
    <Header className="!p-0 flex items-center bg-gray-50 border-b">
      <div className="w-full flex justify-between items-center px-4">
        <div className="flex items-center gap-0 sm:gap-2">
          <div className="relative w-8 h-8 sm:w-12 sm:h-12">
            <Image src={png.Logo} alt="veticube-logo" layout="fill" />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:gap-2">
            <span className="text-md sm:text-2xl text-green-600 font-semibold font-oswald">VETICUBE</span>
            <span className="text-[0px] sm:text-xs text-gray-400 sm:mt-1">{`| admin panel v.1.0`}</span>
          </div>
        </div>
        <div className="grid grid-flow-col items-center gap-2">
          {/* <Dropdown.Button
            type="default"
            trigger={["click"]}
            icon={<DownOutlined />}
            menu={{
              items: themeItems,
              selectedKeys: [darkMode ? "dark" : "light"],
            }}
            buttonsRender={([leftButton, rightButton]) => [
              <Tooltip key="leftButton" title="You can change the theme here." color="green">
                {leftButton}
              </Tooltip>,
              rightButton,
            ]}
          >
            {darkMode ? <MoonOutlined /> : <SunOutlined />}
          </Dropdown.Button> */}
          <Spin spinning={appLoading}>
            <Dropdown.Button
              type="default"
              trigger={["click"]}
              icon={<DownOutlined />}
              menu={{
                items: assignments.map((assignment) => ({
                  key: assignment.branch.id,
                  label: assignment.branch.branch_name,
                  disabled: assignment.branch.id === activeBranch,
                  onClick: () =>
                    dispatch(
                      setActiveBranchRequest({
                        branch_id: assignment.branch.id,
                      })
                    ),
                })),
              }}
            >
              {assignments?.find((assignment) => assignment.branch.id === activeBranch)?.branch.branch_name}
            </Dropdown.Button>
          </Spin>
          {/* <Dropdown.Button
            className="hidden sm:block"
            type="default"
            trigger={["click"]}
            icon={<DownOutlined />}
            menu={{ items: langItems, selectedKeys: [language] }}
          >
            {language === "tr" ? "Türkçe" : "English"}
          </Dropdown.Button> */}
          <UserAvatar />
        </div>
      </div>
    </Header>
  );
};
