import { call, CallEffect, PutEffect } from "redux-saga/effects";
import { createClinicRequest } from "@/redux/slices/clinicSlice";
import { mutations } from "@/services/db";
import toErrorMessage from "@/utils/toError";
import { store } from "@/redux/store";

export function* createClinic(action: ReturnType<typeof createClinicRequest>): Generator<CallEffect<any>, void, any> {
  const { name, branches, onSuccess, onError } = action.payload;
  try {
    const userId = store.getState().auth.clientSession?.user.id;

    // Kullanıcıdan alınan verileri kullanarak yeni bir klinik oluştur
    const response = yield call(mutations.clinics.createClinic, name);
    const clinicId = response.clinic.returning[0].id;

    // Kullanıcıyı bu clinicle bağlantılı olarak managers tablosuna ekle
    if (userId && clinicId) {
      const responseManager = yield call(mutations.auth.managers.insertManager, userId, clinicId);

      // Otomatik olarak clinic_branches tablosuna branchlar eklenmesi
      if (branches) {
        for (const branch of branches) {
          const responseBranch = yield call(mutations.clinics.createBranch, clinicId, branch.name, branch.city, branch.address, branch.phone);
          console.log(responseBranch);
        }
      } else {
        const responseBranch = yield call(mutations.clinics.createBranch, clinicId, "Merkez");
        console.log(responseBranch);
      }
    }

    if (onSuccess) {
      //   onSuccess(clinicId);
    }
  } catch (error) {
    // Hata alındığında onError callback fonksiyonunu çağırma
    const strError = toErrorMessage(error);
    if (onError) {
      onError(strError);
    }
  }
}
