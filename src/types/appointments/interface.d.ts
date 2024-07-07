type AppointmentStatus = "scheduled" | "rescheduled" | "cancelled" | "completed";
type AppointmentType = "check" | "surgery" | "vaccination" | "grooming" | "other";

type Appointment = {
    id: string;
    appointmentDate: string;
    appointmentTime: string;
    clinicBranchId: string;
    veterinarianId: string;
    petId: string;
    staffId: string;
    type: AppointmentType;
    status: AppointmentStatus;
    notes: string;
    createdAt: string;
    updatedAt: string;
};