export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  passwordChangedAt?: string;
  __v?: number;
};
