import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'
import { OriginalDataPoint } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const createOriginalDataPoint = async (
  req: CycleRequest<never, { originalDataPoint: OriginalDataPoint }>,
  res: Response
) => {
  try {
    const { assessmentName, cycleName } = req.query
    const { originalDataPoint } = req.body

    if (!originalDataPoint.year) {
      throw new Error(`odpMissingYear`)
    }

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const returnedOriginalDataPoint = await CycleDataController.createOriginalDataPoint({
      assessment,
      cycle,
      originalDataPoint,
      user: Requests.getUser(req),
    })

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
