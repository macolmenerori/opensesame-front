export type User = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
  passwordChangedAt?: string;
  __v?: number;
};

export type UserRole = 'user' | 'admin';
