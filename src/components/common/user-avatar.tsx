import { useAppSelector } from "@/hooks";
import { Avatar, Button, Divider } from "antd";
import { PiSignOutDuotone as SignOutIcon } from "react-icons/pi";

export const UserAvatar: React.FC<{}> = () => {
  const { darkMode } = useAppSelector((state) => state.theme);
  const { clientSession } = useAppSelector((state) => state.auth);

  return (
    <div
      className={`flex flex-row items-center gap-2 py-0 px-4 rounded-lg shadow-sm border
        compatible-dark ${darkMode ? "bg-gray-600/20 text-white" : "bg-white text-black"} `}
    >
      {/* <Avatar size={"small"} className="capitalize" icon={userData?.displayName?.charAt(0)} /> */}
      <span>{clientSession?.idToken.substring(0, 10)}</span>

      {/* <span className="text-xs text-gray-500">{`(${userData?.email})`}</span> */}
      <Divider type="vertical" className="mx-0" />
      {/* <Button type="link" onClick={signOut}>
        <SignOutIcon size={20} />
      </Button> */}
    </div>
  );
};
