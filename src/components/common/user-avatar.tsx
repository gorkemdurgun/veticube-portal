import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/redux/slices/authSlice";
import { Avatar, Button, Divider, Popconfirm } from "antd";
import { PiSignOutFill as SignOutIcon } from "react-icons/pi";

export const UserAvatar: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.theme);
  const { clientSession } = useAppSelector((state) => state.auth);
  const userData = clientSession?.user;

  return (
    <div
      className={`flex flex-row items-center gap-2 py-0 px-4 rounded-lg shadow-sm border
        compatible-dark ${darkMode ? "bg-gray-600/20 text-white" : "bg-white text-black"} `}
    >
      <Avatar size={"small"} shape="square" className="capitalize bg-gray-300 text-gray-600" icon={userData?.firstName?.charAt(0)} />
      <span className="text-sm text-gray-500">{`${userData?.firstName} ${userData?.lastName}`}</span>
      <Divider type="vertical" className="mx-0" />
      <Popconfirm icon={null} title="Are you sure you want to sign out?" okButtonProps={{ danger: true }} onConfirm={() => dispatch(logout())}>
        <Button danger type="link" className="mx-0 p-0">
          <SignOutIcon className="w-5 h-5" />
        </Button>
      </Popconfirm>
    </div>
  );
};
