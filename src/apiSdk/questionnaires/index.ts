import axios from 'axios';
import queryString from 'query-string';
import { QuestionnaireInterface, QuestionnaireGetQueryInterface } from 'interfaces/questionnaire';
import { GetQueryInterface } from '../../interfaces';

export const getQuestionnaires = async (query?: QuestionnaireGetQueryInterface) => {
  const response = await axios.get(`/api/questionnaires${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createQuestionnaire = async (questionnaire: QuestionnaireInterface) => {
  const response = await axios.post('/api/questionnaires', questionnaire);
  return response.data;
};

export const updateQuestionnaireById = async (id: string, questionnaire: QuestionnaireInterface) => {
  const response = await axios.put(`/api/questionnaires/${id}`, questionnaire);
  return response.data;
};

export const getQuestionnaireById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/questionnaires/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteQuestionnaireById = async (id: string) => {
  const response = await axios.delete(`/api/questionnaires/${id}`);
  return response.data;
};
