import axios from 'axios';
import queryString from 'query-string';
import {
  QuestionnaireAssignmentInterface,
  QuestionnaireAssignmentGetQueryInterface,
} from 'interfaces/questionnaire-assignment';
import { GetQueryInterface } from '../../interfaces';

export const getQuestionnaireAssignments = async (query?: QuestionnaireAssignmentGetQueryInterface) => {
  const response = await axios.get(`/api/questionnaire-assignments${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createQuestionnaireAssignment = async (questionnaireAssignment: QuestionnaireAssignmentInterface) => {
  const response = await axios.post('/api/questionnaire-assignments', questionnaireAssignment);
  return response.data;
};

export const updateQuestionnaireAssignmentById = async (
  id: string,
  questionnaireAssignment: QuestionnaireAssignmentInterface,
) => {
  const response = await axios.put(`/api/questionnaire-assignments/${id}`, questionnaireAssignment);
  return response.data;
};

export const getQuestionnaireAssignmentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/questionnaire-assignments/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteQuestionnaireAssignmentById = async (id: string) => {
  const response = await axios.delete(`/api/questionnaire-assignments/${id}`);
  return response.data;
};
