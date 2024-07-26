import { call, put, takeLatest, ForkEffect, CallEffect, PutEffect } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "@/redux/slices/authSlice"; // authSlice dosyanızın yolunu kontrol edin
import { auth } from "@/services/auth";
import toErrorMessage from "@/utils/toError";

// API çağrısı yapacak fonksiyon
function* login(action: ReturnType<typeof loginRequest>): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { email, password, onSuccess, onError } = action.payload;
  try {
    const response = yield call(auth.login, action.payload.email, action.payload.password);
    console.log(response);
    yield put(
      loginSuccess({
        idToken: response.idToken.jwtToken,
        refreshToken: response.refreshToken.token,
        accessToken: response.accessToken.jwtToken,
      })
    );
    onSuccess && onSuccess();
  } catch (error) {
    const strError = toErrorMessage(error);
    yield put(loginFailure(strError));
    onError && onError(strError);
  }
}

// Ana saga fonksiyonu
function* authSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(loginRequest.type, login); // Veya takeLatest(loginRequest, login);
}

export default authSaga;
