import { QuestionnaireInterface } from 'interfaces/questionnaire';
import { PatientInterface } from 'interfaces/patient';
import { GetQueryInterface } from 'interfaces';

export interface QuestionnaireAssignmentInterface {
  id?: string;
  questionnaire_id: string;
  patient_id: string;
  completed?: boolean;
  created_at?: any;
  updated_at?: any;

  questionnaire?: QuestionnaireInterface;
  patient?: PatientInterface;
  _count?: {};
}

export interface QuestionnaireAssignmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  questionnaire_id?: string;
  patient_id?: string;
}
