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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getQuestionnaireAssignmentById, updateQuestionnaireAssignmentById } from 'apiSdk/questionnaire-assignments';
import { Error } from 'components/error';
import { questionnaireAssignmentValidationSchema } from 'validationSchema/questionnaire-assignments';
import { QuestionnaireAssignmentInterface } from 'interfaces/questionnaire-assignment';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { QuestionnaireInterface } from 'interfaces/questionnaire';
import { PatientInterface } from 'interfaces/patient';
import { getQuestionnaires } from 'apiSdk/questionnaires';
import { getPatients } from 'apiSdk/patients';

function QuestionnaireAssignmentEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<QuestionnaireAssignmentInterface>(
    () => (id ? `/questionnaire-assignments/${id}` : null),
    () => getQuestionnaireAssignmentById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: QuestionnaireAssignmentInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateQuestionnaireAssignmentById(id, values);
      mutate(updated);
      resetForm();
      router.push('/questionnaire-assignments');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<QuestionnaireAssignmentInterface>({
    initialValues: data,
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
            Edit Questionnaire Assignment
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              id="completed"
              display="flex"
              alignItems="center"
              mb="4"
              isInvalid={!!formik.errors?.completed}
            >
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'questionnaire_assignment',
  operation: AccessOperationEnum.UPDATE,
})(QuestionnaireAssignmentEditPage);
