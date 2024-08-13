import { Avatar, Badge, Dropdown, Layout, MenuProps, Tooltip } from "antd";
import { DownOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setLanguage } from "@/redux/slices/languageSlice";
import { setMode } from "@/redux/slices/themeSlice";
import { UserAvatar } from "./user-avatar";

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

  return (
    <Header className="!p-0 flex items-center bg-gray-50 border-b">
      <div className="w-full flex justify-between items-center px-4">
        <div className="text-emerald-700">Admin Panel</div>
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
          <Dropdown.Button type="default" trigger={["click"]} icon={<DownOutlined />} menu={{ items: langItems, selectedKeys: [language] }}>
            {language === "tr" ? "Türkçe" : "English"}
          </Dropdown.Button>
          <UserAvatar />
        </div>
      </div>
    </Header>
  );
};
