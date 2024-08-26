type CreateAppointmentRequestPayload = {
  data: {
    clinic_branch_id: string; // clinic branch id
    pet_id: string; // pet id
    appointment_date: string; // format: YYYY-MM-DD
    apponitment_time: string; // format: HH:mm:ss
    appointment_type: AppointmentType; // like check, surgery, vaccination, etc.
    appointment_veterinarians: string[]; // list of veterinarian ids
    appointment_staffs: string[]; // list of staff ids
    notes?: string; // optional
  };
  onSuccess?: (clinicId: string) => void;
  onError?: (error: string) => void;
};
