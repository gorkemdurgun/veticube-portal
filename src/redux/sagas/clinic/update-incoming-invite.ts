import { message } from "antd";
import { call, put } from "redux-saga/effects";

import { logout } from "@/redux/slices/auth/authSlice";
import { updateEmployeeInviteRequest, updateEmployeeInviteSuccess, updateEmployeeInviteFailure } from "@/redux/slices/clinic/clinicSlice";
import { store } from "@/redux/store";
import { auth } from "@/services/cognito";
import { mutations } from "@/services/db";
import toErrorMessage from "@/utils/toError";

import type { CallEffect, PutEffect } from "redux-saga/effects";

export function* updateIncomingInvite(
  action: ReturnType<typeof updateEmployeeInviteRequest>
): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { inviteId, status, onSuccess, onError } = action.payload;

  try {
    // Daveti cevaplama
    const updatedInviteData = yield call(mutations.clinics.updateIncomingInvite, inviteId, status);
    const currentStatus = updatedInviteData?.update_clinic_management_invitations_by_pk.status;
    const currentRole = updatedInviteData?.update_clinic_management_invitations_by_pk.role;

    // Davet kabul edildiğinde
    if (currentStatus === "accepted") {
      if (currentRole) {
        // Kullanıcı rolünü güncelleme
        yield call(auth.user.updateAttributes, [
          {
            Name: "custom:role",
            Value: currentRole,
          },
        ]);
      }
    } else if (currentStatus === "rejected") {
      message.error("Davet reddedildi");
    }

    // Başarılı olunduğunda Redux state güncelleme
    yield put(updateEmployeeInviteSuccess());

    // Başarılı olunduğunda onSuccess callback fonksiyonunu çağırma
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    const strError = toErrorMessage(error);

    // Hata alındığında onError callback fonksiyonunu çağırma
    if (onError) {
      onError(strError);
    }

    // Hata olunduğunda Redux state güncelleme
    yield put(updateEmployeeInviteFailure(strError));
  }
}
