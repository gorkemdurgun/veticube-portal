import { all } from 'redux-saga/effects';
import authSaga from './authSaga'; // authSaga dosyanızın yolunu kontrol edin

export default function* rootSaga(): Generator<any, void, unknown> {
  yield all([
    authSaga(),
    // Diğer saga'larınızı buraya ekleyin
  ]);
}