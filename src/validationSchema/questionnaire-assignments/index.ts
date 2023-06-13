import * as yup from 'yup';

export const questionnaireAssignmentValidationSchema = yup.object().shape({
  completed: yup.boolean().required(),
  questionnaire_id: yup.string().nullable().required(),
  patient_id: yup.string().nullable().required(),
});
