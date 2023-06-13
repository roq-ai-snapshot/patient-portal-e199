import { QuestionnaireAssignmentInterface } from 'interfaces/questionnaire-assignment';
import { ClinicInterface } from 'interfaces/clinic';
import { GetQueryInterface } from 'interfaces';

export interface QuestionnaireInterface {
  id?: string;
  title: string;
  clinic_id: string;
  created_at?: any;
  updated_at?: any;
  questionnaire_assignment?: QuestionnaireAssignmentInterface[];
  clinic?: ClinicInterface;
  _count?: {
    questionnaire_assignment?: number;
  };
}

export interface QuestionnaireGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  clinic_id?: string;
}
