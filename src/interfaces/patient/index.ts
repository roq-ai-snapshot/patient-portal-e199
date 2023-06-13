import { DocumentInterface } from 'interfaces/document';
import { QuestionnaireAssignmentInterface } from 'interfaces/questionnaire-assignment';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PatientInterface {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  document?: DocumentInterface[];
  questionnaire_assignment?: QuestionnaireAssignmentInterface[];
  user?: UserInterface;
  _count?: {
    document?: number;
    questionnaire_assignment?: number;
  };
}

export interface PatientGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  user_id?: string;
}
