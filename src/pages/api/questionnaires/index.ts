import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { questionnaireValidationSchema } from 'validationSchema/questionnaires';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getQuestionnaires();
    case 'POST':
      return createQuestionnaire();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getQuestionnaires() {
    const data = await prisma.questionnaire
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'questionnaire'));
    return res.status(200).json(data);
  }

  async function createQuestionnaire() {
    await questionnaireValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.questionnaire_assignment?.length > 0) {
      const create_questionnaire_assignment = body.questionnaire_assignment;
      body.questionnaire_assignment = {
        create: create_questionnaire_assignment,
      };
    } else {
      delete body.questionnaire_assignment;
    }
    const data = await prisma.questionnaire.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
