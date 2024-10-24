import { message } from "antd";
import { call, put } from "redux-saga/effects";

import { setActiveBranchRequest } from "@/redux/slices/app/appSlice";
import { loginRequest, loginSuccess, loginFailure } from "@/redux/slices/auth/authSlice";
import { getUserSuccess } from "@/redux/slices/user/userSlice";
import { auth } from "@/services/cognito";
import { rest } from "@/services/db";
import { GetBreedsResponse } from "@/services/db/rest/app";
import type { GetUserByIdResponse, GetManagerAssignmentsResponse, GetEmployeeAssignmentsResponse } from "@/services/db/rest/user";
import toErrorMessage from "@/utils/toError";

import type { CallEffect, PutEffect } from "redux-saga/effects";

export function* login(action: ReturnType<typeof loginRequest>): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { email, password, onSuccess, onError } = action.payload;
  try {
    // Cognito login
    const authResponse = yield call(auth.login.loginUser, email, password);
    const userId = authResponse?.idToken?.payload?.sub;
    const userRole = authResponse?.idToken?.payload["custom:role"] as UserRole;

    console.log("authResponse", authResponse);

    if (!userId) {
      throw new Error("No user ID found in response");
    }

    // Session data to Redux
    yield put(
      loginSuccess({
        idToken: authResponse.idToken,
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
        clockDrift: authResponse.clockDrift,
      })
    );

    // Hasura rest req for user data
    const { user }: GetUserByIdResponse = yield call(rest.user.getUserById, userId);
    console.log("user", user);

    if (!user) {
      throw new Error("No user data found in response");
    }

    if (process.env.NODE_ENV === "development") {
      message.success(`Welcome, ${user.full_name}!`);
    }

    let assignmentList: GetUserSuccessPayload["assignments"] = [];
    if (userRole === "manager") {
      const { assignment }: GetManagerAssignmentsResponse = yield call(rest.user.getManagerAssignments, userId);
      const branches = assignment?.clinic?.branches;

      if (!branches) {
        throw new Error("No branches found in response");
      }

      assignmentList = branches.map((branch) => ({
        role: "manager",
        assigned_at: assignment.assigned_at,
        branch: branch,
      }));
    } else if (userRole === "veterinarian" || userRole === "nurse" || userRole === "secretary") {
      const { assignment }: GetEmployeeAssignmentsResponse = yield call(rest.user.getEmployeeAssignments, userId);
      assignmentList = [assignment];
    } else if (userRole === "user") {
      assignmentList = [];
    } else {
      throw new Error("Unknown user role");
    }

    if (assignmentList.length > 0) {
      yield put(setActiveBranchRequest({ branch_id: assignmentList[0].branch.id }));
    }

    yield put(
      getUserSuccess({
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          phone_number: user.phone_number,
          status: user.status,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
        assignments: assignmentList,
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
