type CreateClinicRequestPayload = {
  name: string;
  branch: {
    name: string;
    city: string;
    address?: string;
    phone_number?: string;
  };
  onSuccess?: (clinicId: string) => void;
  onError?: (error: string) => void;
};

type UpdateEmployeeInviteRequestPayload = {
  inviteId: string;
  status: "accepted" | "rejected";
  onSuccess?: () => void;
  onError?: (error: string) => void;
};
