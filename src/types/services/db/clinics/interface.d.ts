type ClinicItem = {
  id: string;
  name: string;
  branches: ClinicBranchItem[];
};
type ClinicBranchItem = {
  id: string;
  branch_name: string;
  phone: string;
  address: string;
  city: string;
};
