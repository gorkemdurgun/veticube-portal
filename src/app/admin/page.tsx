"use client";

import { queries, subscriptions } from "@/services";
import { useSubscription } from "@apollo/client";

const AdminPage = () => {
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

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        {subscriptionData?.users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
