type CreateClinicRequestPayload = {
    name: string;
    branches?: {
      name: string;
      city?: string;
      address?: string;
      phone?: string;
    }[];
    onSuccess?: (clinicId: string) => void;
    onError?: (error: string) => void;
  };
  