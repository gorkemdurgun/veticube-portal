import { call } from "redux-saga/effects";

import { signUpVetAccountRequest } from "@/redux/slices/authSlice";
import { auth } from "@/services/cognito";
import { mutations } from "@/services/db";
import toErrorMessage from "@/utils/toError";

import type { CallEffect, PutEffect } from "redux-saga/effects";

export function* signUpVetAccount(action: ReturnType<typeof signUpVetAccountRequest>): Generator<CallEffect<any>, void, any> {
  const { firstName, lastName, email, password, countryCode, phoneNumber, clinicBranchId, specilization, onSuccess, onError } = action.payload;
  try {
    // Kayıt işlemi için auth.signup fonksiyonunu çağırma
    const response = yield call(auth.signup.signupUser, email, password, firstName, lastName, countryCode, phoneNumber);
    const userId = response.userId;

    // Kullanıcıyı veritabanına kaydetme ve kullanıcıya veteriner rolü verme
    if (userId) {
      const vet = yield call(mutations.auth.veterinarians.insertVeterinarian, userId, clinicBranchId, specilization);
      // console.log(vet);

      // console.log("Updating user role...", userId);
      const updateRole = yield call(mutations.auth.veterinarians.updateVetRole, userId);
      // console.log(updateRole);
    }

    if (onSuccess) {
      // console.log("Sending email to user...");
      onSuccess(email);
    }
  } catch (error) {
    // Hata alındığında onError callback fonksiyonunu çağırma
    const strError = toErrorMessage(error);
    if (onError) {
      onError(strError);
    }
  }
}
