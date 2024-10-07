import { message } from "antd";
import { call, put } from "redux-saga/effects";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { loginRequest, loginSuccess, loginFailure } from "@/redux/slices/auth/authSlice";
import { getUserSuccess } from "@/redux/slices/user/userSlice";
import { auth } from "@/services/cognito";
import { queries } from "@/services/db";
import { GetUserResponse } from "@/services/db/queries/user";
import toErrorMessage from "@/utils/toError";

import type { CallEffect, PutEffect } from "redux-saga/effects";

export function* login(action: ReturnType<typeof loginRequest>): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { email, password, onSuccess, onError } = action.payload;
  try {
    // Cognito login
    const authResponse = yield call(auth.login.loginUser, email, password);
    const userId = authResponse?.idToken?.payload?.sub;
    const userRole = authResponse?.idToken?.payload["custom:role"];

    console.log("authResponse", authResponse);

    if (!userId) {
      throw new Error("No user ID found in response");
    }

    // Hasura query for user data
    const { data: userResponse } = yield call([apolloGqlClient, apolloGqlClient.query], {
      query: queries.user.GetUser,
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${authResponse.idToken.jwtToken}`,
          "x-hasura-role": userRole,
        },
      },
      variables: {
        id: userId,
      },
    });

    if (!userResponse) {
      throw new Error("No user data found");
    }

    const userData = userResponse.user as GetUserResponse["user"];

    if (!userData) {
      throw new Error("No user data found at index 0");
    }

    if (process.env.NODE_ENV === "development") {
      message.success(`Welcome, ${userData.name}!. You are logged in as ${userData.role}`);
    }

    /*
    const apolloQueryOptions: any = {
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${authResponse.idToken.jwtToken}`,
        },
      },
    };

    const roleQueryMap = {
      manager: queries.user.GetManager,
      veterinarian: queries.user.GetVeterinarian,
      nurse: queries.user.GetNurse,
      secretary: queries.user.GetSecretary,
      client: queries.user.GetClient,
    };

    const query = roleQueryMap[userRole];

    if (query) {
      const { data } = yield call([apolloGqlClient, apolloGqlClient.query], {
        query,
        ...apolloQueryOptions,
      });
      console.log(`${userRole}Data`, data);
    } else {
      throw new Error("Unknown user role");
    }
    */

    // Session data to Redux
    yield put(
      loginSuccess({
        idToken: authResponse.idToken,
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
        clockDrift: authResponse.clockDrift,
      })
    );

    // User data to Redux
    yield put(
      getUserSuccess({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        phone_number: userData.phone_number,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
      })
    );

    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.error(error);
    const strError = toErrorMessage(error);
    message.error(strError);
    yield put(loginFailure(strError));
    if (onError) {
      onError(strError);
    }
  }
}
