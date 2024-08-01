import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { createClinicRequest, createClinicSuccess, createClinicFailure } from "@/redux/slices/clinicSlice";
import { mutations } from "@/services/db";
import toErrorMessage from "@/utils/toError";
import { store } from "@/redux/store";

export function* createClinic(action: ReturnType<typeof createClinicRequest>): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { name, branches, onSuccess, onError } = action.payload;
  console.log("saga payload", action.payload);
  try {
    const userId = store.getState().auth.clientSession?.user.id;

    if (!userId) {
      throw new Error("User ID is not available");
    }

    // Kullanıcıdan alınan verileri kullanarak yeni bir klinik oluştur
    const response = yield call(mutations.clinics.createClinic, name);
    const clinicId = response.clinic.returning[0].id;

    if (!clinicId) {
      throw new Error("Failed to create clinic");
    }

    // Kullanıcıyı bu clinicle bağlantılı olarak managers tablosuna ekle
    console.log("saga uids", userId, clinicId);
    const responseManager = yield call(mutations.auth.managers.insertManager, userId, clinicId);

    // Otomatik olarak clinic_branches tablosuna branchlar eklenmesi
    if (!branches || branches.length === 0) {
      throw new Error("Branches are not defined");
    }

    console.log("saga br", branches);
    for (const branch of branches) {
      yield call(mutations.clinics.createBranch, clinicId, branch.name, branch.city, branch.address, branch.phone);
    }

    // Başarılı olunduğunda onSuccess callback fonksiyonunu çağırma
    if (onSuccess) {
      onSuccess(clinicId);
    }

    // Başarılı olunduğunda Redux state güncelleme
    yield put(createClinicSuccess(clinicId));
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
