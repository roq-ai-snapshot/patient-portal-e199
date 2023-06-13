import * as yup from 'yup';
import { questionnaireAssignmentValidationSchema } from 'validationSchema/questionnaire-assignments';

export const questionnaireValidationSchema = yup.object().shape({
  title: yup.string().required(),
  clinic_id: yup.string().nullable().required(),
  questionnaire_assignment: yup.array().of(questionnaireAssignmentValidationSchema),
});
