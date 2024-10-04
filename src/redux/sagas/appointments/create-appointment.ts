import { call, put } from "redux-saga/effects";

import { createAppointmentRequest, createAppointmentSuccess, createAppointmentFailure } from "@/redux/slices/appointment/appointmentSlice";
import { store } from "@/redux/store";
import { mutations } from "@/services/db";
import toErrorMessage from "@/utils/toError";

import type { CallEffect, PutEffect } from "redux-saga/effects";

export function* createAppointment(
  action: ReturnType<typeof createAppointmentRequest>
): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { data, onSuccess, onError } = action.payload;

  const {
    pet_id,
    clinic_branch_id,
    appointment_date,
    appointment_time,
    appointment_type,
    appointment_veterinarians,
    appointment_staffs,
    notes,
  } = data;

  try {
    console.log("saga payload", action.payload);

    //  fake api call
    yield call(() => new Promise((resolve) => setTimeout(resolve, 1000)));

    const response = yield call(
      mutations.appointments.createAppointment,
      pet_id,
      clinic_branch_id,
      appointment_date,
      appointment_time,
      appointment_type,
      notes
    );

    console.log("cre-appointment, response", response);
  } catch (error) {
    const strError = toErrorMessage(error);

    // Hata alındığında onError callback fonksiyonunu çağırma
    if (onError) {
      onError(strError);
    }

    // Hata olunduğunda Redux state güncelleme
    // yield put(createClinicFailure(strError));
  }
}
