type SignUpVetAccountRequestPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    countryCode: string;
    phoneNumber: string;
    clinicBranchId: string;
    specilization?: string;
    onSuccess?: (email: string) => void;
    onError?: (error: string) => void;
  };
  