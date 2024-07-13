interface User {
  avatarUrl: string;
  createdAt: string;
  defaultRole: AuthRoles;
  displayName: string;
  email: string;
  emailVerified: boolean;
  id: string;
  isAnonymous: boolean;
  locale: string;
  metadata: any;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  roles: AuthRoles[];
}
