import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { sendErr } from '@server/utils/requests'
import { AssessmentController } from '@server/controller'
import { AssessmentName } from '@meta/assessment'

export const AssessmentGetCountryStatus = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Assessment.countryStatus(), async (req: Request, res: Response) => {
      const { countryIso, name, cycleName } = req.params
      try {
        const countryStatus = await AssessmentController.getCountryStatus({
          countryIso,
          name: name as AssessmentName,
          cycleName,
        })
        res.send(countryStatus)
      } catch (e) {
        sendErr(res, e)
      }
    })
  },
}
