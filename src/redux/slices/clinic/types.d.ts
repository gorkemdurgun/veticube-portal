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
