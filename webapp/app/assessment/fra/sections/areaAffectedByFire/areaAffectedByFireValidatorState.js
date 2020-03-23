import * as FRA from '@common/assessment/fra'

import * as AssessmentStateValidator from '@webapp/app/assessment/assessmentStateValidator'

const section = FRA.sections['5'].children.b

export const totalForestLandAreaAreaValidator = AssessmentStateValidator.subCategoryValidator(
  FRA.type,
  section.name,
  section.tables.areaAffectedByFire,
  0,
  [1]
)

export const getValidationMessages = data => state => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages = []
    messages.push(colMessages)

    for (let rowIdx = 0; rowIdx < data.length; rowIdx += 1) {
      if (!totalForestLandAreaAreaValidator(colIdx)(state)) {
        colMessages.push({ key: 'generalValidation.subCategoryExceedsParent' })
        break
      }
    }
  }

  return messages
}
