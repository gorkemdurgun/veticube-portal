import { message } from "antd";
import { call, put } from "redux-saga/effects";

import { setActiveBranchFailure, setActiveBranchRequest, setActiveBranchSuccess } from "@/redux/slices/app/appSlice";
import { rest } from "@/services/db";
import { GetClinicRecordsByBranchIdResponse } from "@/services/db/rest/clinic";
import toErrorMessage from "@/utils/toError";

import type { CallEffect, PutEffect } from "redux-saga/effects";

export function* setActiveBranch(action: ReturnType<typeof setActiveBranchRequest>): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { branch_id, onSuccess, onError } = action.payload;

  try {
    const branchClientsResponse: GetClinicRecordsByBranchIdResponse = yield call(rest.clinic.getClinicRecordsByBranchId, branch_id);

    yield put(
      setActiveBranchSuccess({
        branch_id: branch_id,
        branch_clients: branchClientsResponse.clinic.branch_client_records,
      })
    );

    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.error(error);
    const strError = toErrorMessage(error);
    message.error(strError);
    yield put(setActiveBranchFailure(strError));
    if (onError) {
      onError(strError);
    }
  }
}
