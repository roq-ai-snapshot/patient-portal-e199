import { UserInterface } from 'interfaces/user';
import { PatientInterface } from 'interfaces/patient';
import { GetQueryInterface } from 'interfaces';

export interface DocumentInterface {
  id?: string;
  file_name: string;
  file_path: string;
  user_id: string;
  patient_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  patient?: PatientInterface;
  _count?: {};
}

export interface DocumentGetQueryInterface extends GetQueryInterface {
  id?: string;
  file_name?: string;
  file_path?: string;
  user_id?: string;
  patient_id?: string;
}
