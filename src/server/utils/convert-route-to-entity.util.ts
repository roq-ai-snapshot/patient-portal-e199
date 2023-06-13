const mapping: Record<string, string> = {
  clinics: 'clinic',
  documents: 'document',
  patients: 'patient',
  questionnaires: 'questionnaire',
  'questionnaire-assignments': 'questionnaire_assignment',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
