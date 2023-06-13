import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createQuestionnaireAssignment } from 'apiSdk/questionnaire-assignments';
import { Error } from 'components/error';
import { questionnaireAssignmentValidationSchema } from 'validationSchema/questionnaire-assignments';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { QuestionnaireInterface } from 'interfaces/questionnaire';
import { PatientInterface } from 'interfaces/patient';
import { getQuestionnaires } from 'apiSdk/questionnaires';
import { getPatients } from 'apiSdk/patients';
import { QuestionnaireAssignmentInterface } from 'interfaces/questionnaire-assignment';

function QuestionnaireAssignmentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: QuestionnaireAssignmentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createQuestionnaireAssignment(values);
      resetForm();
      router.push('/questionnaire-assignments');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<QuestionnaireAssignmentInterface>({
    initialValues: {
      completed: false,
      questionnaire_id: (router.query.questionnaire_id as string) ?? null,
      patient_id: (router.query.patient_id as string) ?? null,
    },
    validationSchema: questionnaireAssignmentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Questionnaire Assignment
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="completed" display="flex" alignItems="center" mb="4" isInvalid={!!formik.errors?.completed}>
            <FormLabel htmlFor="switch-completed">Completed</FormLabel>
            <Switch
              id="switch-completed"
              name="completed"
              onChange={formik.handleChange}
              value={formik.values?.completed ? 1 : 0}
            />
            {formik.errors?.completed && <FormErrorMessage>{formik.errors?.completed}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<QuestionnaireInterface>
            formik={formik}
            name={'questionnaire_id'}
            label={'Select Questionnaire'}
            placeholder={'Select Questionnaire'}
            fetcher={getQuestionnaires}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <AsyncSelect<PatientInterface>
            formik={formik}
            name={'patient_id'}
            label={'Select Patient'}
            placeholder={'Select Patient'}
            fetcher={getPatients}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'questionnaire_assignment',
  operation: AccessOperationEnum.CREATE,
})(QuestionnaireAssignmentCreatePage);
