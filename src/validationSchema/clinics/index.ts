import * as yup from 'yup';
import { questionnaireValidationSchema } from 'validationSchema/questionnaires';

export const clinicValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  questionnaire: yup.array().of(questionnaireValidationSchema),
});
