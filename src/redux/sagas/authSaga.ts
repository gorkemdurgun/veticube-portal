import { call, put, takeLatest, takeEvery, ForkEffect, CallEffect, PutEffect } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure, signUpVetAccountRequest } from "@/redux/slices/authSlice"; // authSlice dosyanızın yolunu kontrol edin
import { auth } from "@/services/auth";
import { mutations } from "@/services/db";
import toErrorMessage from "@/utils/toError";

function* login(action: ReturnType<typeof loginRequest>): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { email, password, onSuccess, onError } = action.payload;
  try {
    const response = yield call(auth.login, email, password);
    console.log(response);
    yield put(
      loginSuccess({
        idToken: response.idToken.jwtToken,
        refreshToken: response.refreshToken.token,
        accessToken: response.accessToken.jwtToken,
      })
    );
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    const strError = toErrorMessage(error);
    yield put(loginFailure(strError));
    if (onError) {
      onError(strError);
    }
  }
}

function* signUpVetAccount(action: ReturnType<typeof signUpVetAccountRequest>): Generator<CallEffect<any>, void, any> {
  const { firstName, lastName, email, password, countryCode, phoneNumber, clinicBranchId, specilization, onSuccess, onError } = action.payload;
  try {
    // Kayıt işlemi için auth.signup fonksiyonunu çağırma
    const response = yield call(auth.signup.signupUser, email, password, firstName, lastName, countryCode, phoneNumber);
    const userId = response.userId;

    // Kullanıcıyı veritabanına kaydetme
    if (userId) {
      const vet = yield call(mutations.auth.veterinarians.insertVeterinarian, userId, clinicBranchId, specilization);
      console.log(vet);
    }

    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    // Hata alındığında onError callback fonksiyonunu çağırma
    const strError = toErrorMessage(error);
    if (onError) {
      onError(strError);
    }
  }
}

// Ana saga fonksiyonu
function* authSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(loginRequest.type, login);
  yield takeEvery(signUpVetAccountRequest.type, signUpVetAccount);
}

export default authSaga;
