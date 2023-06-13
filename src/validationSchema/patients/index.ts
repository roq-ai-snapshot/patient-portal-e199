import * as yup from 'yup';
import { documentValidationSchema } from 'validationSchema/documents';
import { questionnaireAssignmentValidationSchema } from 'validationSchema/questionnaire-assignments';

export const patientValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().required(),
  user_id: yup.string().nullable().required(),
  document: yup.array().of(documentValidationSchema),
  questionnaire_assignment: yup.array().of(questionnaireAssignmentValidationSchema),
});
