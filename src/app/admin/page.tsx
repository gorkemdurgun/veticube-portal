"use client";

import { useAccessToken, useNhostClient, useSignInEmailPassword, useSignOut, useSignUpEmailPassword } from "@nhost/nextjs";
import { Button } from "antd";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const nhostCli = useNhostClient();
  // const { signUpEmailPassword } = useSignUpEmailPassword();
  const { signInEmailPassword, isSuccess: isLoginSuccess, isError: isLoginError } = useSignInEmailPassword();
  const { signOut } = useSignOut();
  const accessToken = useAccessToken();

  async function loginToHasura() {
    const email = "new@gorkemmail.com";
    const password = "123123123";

    signInEmailPassword(email, password);

    if (isLoginSuccess) {
      console.log("Login success");
    } else if (isLoginError) {
      console.error("Login error");
    }
  }

  async function fetchData() {
    // query in public folder, notes table; returning note
    const { data, error } = await nhostCli.graphql.request(
      `
      query {
        notes {
          note
        }
      }
      `,
      {}
      /*
      {
        headers: {
          contentType: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
      */
    );

    if (error) {
      console.error("Error fetching data", error);
    } else {
      console.log("Data", data);
    }
  }

  return (
    <span>
      <Button type="primary" onClick={loginToHasura}>
        Login to Hasura
      </Button>
      <Button type="primary" onClick={signOut}>
        Logout
      </Button>
      <Button type="primary" onClick={fetchData}>
        Fetch Data
      </Button>
    </span>
  );
};
export default AdminPage;
