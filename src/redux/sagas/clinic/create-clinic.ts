import { call, put } from "redux-saga/effects";

import { apolloClient } from "@/apollo/client";
import { clinicMutations } from "@/apollo/mutation";
import { createClinicRequest, createClinicSuccess, createClinicFailure } from "@/redux/slices/clinic/clinicSlice";
import { store } from "@/redux/store";
import toErrorMessage from "@/utils/toError";

import type { CallEffect, PutEffect } from "redux-saga/effects";

export function* createClinic(action: ReturnType<typeof createClinicRequest>): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { name, branch, onSuccess, onError } = action.payload;

  try {
    // Ana kliniği oluştur
    const { data: createClinicData, errors: createClinicErrors } = yield call(() =>
      apolloClient.mutate({
        mutation: clinicMutations.createClinic,
        variables: {
          clinic_name: name,
        },
      })
    );

    console.log("createClinicData", createClinicData);

    if (createClinicErrors) {
      console.error("createClinicErrors", createClinicErrors);
      throw new Error(createClinicErrors[0]?.message);
    }

    // Oluşturulan ana kliniğin ID'sini al
    const clinicId = createClinicData.insert_clinic.returning[0].id;

    // Ana kliniğe bağlı bir branch oluştur
    const { data: createBranchData, errors: createBranchErrors } = yield call(() =>
      apolloClient.mutate({
        mutation: clinicMutations.createBranch,
        variables: {
          clinic_id: clinicId,
          branch_name: branch.name,
          city: branch.city,
          address: branch.address,
          phone_number: branch.phone_number,
        },
      })
    );

    console.log("createBranchData", createBranchData);

    if (createBranchErrors) {
      console.error("createBranchErrors", createBranchErrors);
      throw new Error(createBranchErrors[0]?.message);
    }

    // Kullanıcı ile kliniği ilişkilendir
    const userId = store.getState().user.user?.id;
    if (!userId) {
      throw new Error("User ID is not available");
    }

    // Kullanıcıyı kliniğe yönetici olarak ekle
    const { data: addManagerData, errors: addManagerErrors } = yield call(() =>
      apolloClient.mutate({
        mutation: clinicMutations.addManagerToClinic,
        variables: {
          user_id: userId,
          clinic_id: clinicId,
        },
      })
    );

    console.log("addManagerData", addManagerData);

    if (addManagerErrors) {
      console.error("addManagerErrors", addManagerErrors);
      throw new Error(addManagerErrors[0]?.message);
    }

    // Başarılı olunduğunda Redux state güncelleme
    yield put(createClinicSuccess());

    // Başarılı olunduğunda onSuccess callback fonksiyonunu çağırma
    if (onSuccess) {
      onSuccess(clinicId);
    }
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
