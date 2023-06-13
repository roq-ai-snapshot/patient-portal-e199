import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { questionnaireAssignmentValidationSchema } from 'validationSchema/questionnaire-assignments';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.questionnaire_assignment
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getQuestionnaireAssignmentById();
    case 'PUT':
      return updateQuestionnaireAssignmentById();
    case 'DELETE':
      return deleteQuestionnaireAssignmentById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getQuestionnaireAssignmentById() {
    const data = await prisma.questionnaire_assignment.findFirst(
      convertQueryToPrismaUtil(req.query, 'questionnaire_assignment'),
    );
    return res.status(200).json(data);
  }

  async function updateQuestionnaireAssignmentById() {
    await questionnaireAssignmentValidationSchema.validate(req.body);
    const data = await prisma.questionnaire_assignment.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteQuestionnaireAssignmentById() {
    const data = await prisma.questionnaire_assignment.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
