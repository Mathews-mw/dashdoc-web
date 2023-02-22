declare module '*.html';

interface IUserView {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone_number: string;
  bio: string;
  company: string;
  created_at: Date;
  updated_at: Date;
  permissions?: string[];
  roles?: string[];
}