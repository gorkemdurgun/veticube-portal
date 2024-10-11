import { call, put } from "redux-saga/effects";

import { createClinicRequest, createClinicSuccess, createClinicFailure } from "@/redux/slices/clinic/clinicSlice";
import { store } from "@/redux/store";
import { mutations } from "@/services/db";
import toErrorMessage from "@/utils/toError";

import type { CallEffect, PutEffect } from "redux-saga/effects";

export function* createClinic(action: ReturnType<typeof createClinicRequest>): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { name, branch, onSuccess, onError } = action.payload;

  try {
    // Ana kliniği oluştur
    const createdClinic = yield call(mutations.clinics.createClinic, name);
    console.log("createdClinic", createdClinic);

    const clinicId = createdClinic.insert_clinic.returning[0].id;
    if (!clinicId) {
      throw new Error("Failed to create clinic");
    }

    // Ana kliniğe bağlı bir branch oluştur
    const createdBranch = yield call(mutations.clinics.createBranch, clinicId, branch.name, branch.city, branch.address, branch.phone_number);
    console.log("createdBranch", createdBranch);

    if (!createdBranch) {
      throw new Error("Failed to create branch");
    }

    // Kullanıcı ile kliniği ilişkilendir
    const userId = store.getState().user.user?.id;
    if (!userId) {
      throw new Error("User ID is not available");
    }
    // const relatedManager = yield call(mutations.auth.managers.insertManager, userId, clinicId);

    /*
    // Başarılı olunduğunda Redux state güncelleme
    yield put(createClinicSuccess(clinicId));

    // Başarılı olunduğunda onSuccess callback fonksiyonunu çağırma
    if (onSuccess) {
      onSuccess(clinicId);
    }
    */
  } catch (error) {
    const strError = toErrorMessage(error);

    // Hata alındığında onError callback fonksiyonunu çağırma
    if (onError) {
      onError(strError);
    }

    // Hata olunduğunda Redux state güncelleme
    yield put(createClinicFailure(strError));
  }
}
