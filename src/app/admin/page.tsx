"use client";

import { queries, subscriptions } from "@/services";
import { useSubscription } from "@apollo/client";
import { Breadcrumb, BreadcrumbProps } from "antd";

const AdminPage = () => {
  /*
  const {
    data: subscriptionData,
    loading: subscriptionIsLoading,
    error: subscriptionError,
  } = useSubscription<{ users: { id: string; name: string }[] }>(subscriptions.users.getUsers);

  let onlineUsersList = null;

  if (subscriptionIsLoading) {
    return <span>Loading...</span>;
  }
  if (subscriptionError) {
    console.error(subscriptionError);
    return <span>Error!</span>;
  }
  if (subscriptionData) {
    console.log(subscriptionData);
    onlineUsersList = subscriptionData;
  }
  */

  const breadcrumbItems: BreadcrumbProps["items"] = [
    {
      title: "Admin",
    },
    {
      title: "Dashboard",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default AdminPage;
