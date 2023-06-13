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
import { createQuestionnaire } from 'apiSdk/questionnaires';
import { Error } from 'components/error';
import { questionnaireValidationSchema } from 'validationSchema/questionnaires';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ClinicInterface } from 'interfaces/clinic';
import { getClinics } from 'apiSdk/clinics';
import { QuestionnaireInterface } from 'interfaces/questionnaire';

function QuestionnaireCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: QuestionnaireInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createQuestionnaire(values);
      resetForm();
      router.push('/questionnaires');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<QuestionnaireInterface>({
    initialValues: {
      title: '',
      clinic_id: (router.query.clinic_id as string) ?? null,
    },
    validationSchema: questionnaireValidationSchema,
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
            Create Questionnaire
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="title" mb="4" isInvalid={!!formik.errors?.title}>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" value={formik.values?.title} onChange={formik.handleChange} />
            {formik.errors.title && <FormErrorMessage>{formik.errors?.title}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<ClinicInterface>
            formik={formik}
            name={'clinic_id'}
            label={'Select Clinic'}
            placeholder={'Select Clinic'}
            fetcher={getClinics}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
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
  entity: 'questionnaire',
  operation: AccessOperationEnum.CREATE,
})(QuestionnaireCreatePage);
