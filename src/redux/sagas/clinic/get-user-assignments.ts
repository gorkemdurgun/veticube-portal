import { message } from "antd";
import { call, put } from "redux-saga/effects";

import { setActiveBranchRequest } from "@/redux/slices/app/appSlice";
import {
  getUserClinicAssignmentsRequest,
  getUserClinicAssignmentsSuccess,
  getUserClinicAssignmentsFailure,
} from "@/redux/slices/clinic/clinicSlice";
import { userServices } from "@/services/restapi/user";
import toErrorMessage from "@/utils/toError";

import type { CallEffect, PutEffect } from "redux-saga/effects";

export function* getUserClinicAssignments(
  action: ReturnType<typeof getUserClinicAssignmentsRequest>
): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { userId, userRole, onSuccess, onError } = action.payload;
  try {
    let assignmentList: GetUserClinicAssignmentsSuccessPayload["assignments"] = [];
    if (userRole === "manager") {
      const { assignment }: Awaited<ReturnType<typeof userServices.getManagerAssignments>> = yield call(
        userServices.getManagerAssignments,
        userId
      );
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
      const { assignment }: Awaited<ReturnType<typeof userServices.getEmployeeAssignments>> = yield call(
        userServices.getEmployeeAssignments,
        userId
      );
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
      getUserClinicAssignmentsSuccess({
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
    yield put(getUserClinicAssignmentsFailure(strError));
    if (onError) {
      onError(strError);
    }
  }
}
