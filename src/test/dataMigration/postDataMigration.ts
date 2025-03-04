import { AssessmentController } from '@server/controller/assessment'
import { DB } from '@server/db'

import { add2025Columns } from '@test/dataMigration/steps/add2025Columns/add2025Columns'
import { cleanupCountryProps } from '@test/dataMigration/steps/cleanupCountryProps'
import { deleteAtlantisData } from '@test/dataMigration/steps/deleteAtlantisData/deleteAtlantisData'
import { deleteInvalid2025Nodes } from '@test/dataMigration/steps/deleteInvalid2025Nodes/deleteInvalid2025Nodes'
import { deleteWrongCalculatedNodes } from '@test/dataMigration/steps/deleteWrongCalculatedNodes'
import { metadataFix } from '@test/dataMigration/steps/metadataFix/metadataFix'
import { migrateBiomassAndCarbonStockData } from '@test/dataMigration/steps/migrateBiomassAndCarbonStockData'
import { migrateDescriptions } from '@test/dataMigration/steps/migrateDescriptions'
import { migrateMessageBoard } from '@test/dataMigration/steps/migrateMessageBoard'
import { migratePrimaryForestData } from '@test/dataMigration/steps/migratePrimaryForestData'
import { postMetadataFix } from '@test/dataMigration/steps/postMetadataFix/postMetadataFix'
import { updateCalculatedNodes } from '@test/dataMigration/steps/updateCalculatedNodes/updateCalculatedNodes'
import { validateNodes } from '@test/dataMigration/steps/validateNodes/validateNodes'

afterAll(async () => {
  await DB.$pool.end()
})

describe('Post Data migration', () => {
  test('Update node values', async () => {
    const start = new Date().getTime()
    // eslint-disable-next-line no-console
    console.log('========== START POST DATA MIGRATION ', start)
    await DB.tx(async (client) => {
      const assessment = await AssessmentController.getOne({ assessmentName: 'fra', metaCache: true }, client)
      // TODO: remove two below
      await add2025Columns({ assessment }, client)
      await metadataFix({ assessment }, client)
      await migrateBiomassAndCarbonStockData({ assessment }, client)
      for (let i = 0; i < assessment.cycles.length; i += 1) {
        const cycle = assessment.cycles[i]
        // eslint-disable-next-line no-await-in-loop
        await deleteWrongCalculatedNodes({ assessment, cycle }, client)
        // eslint-disable-next-line no-await-in-loop
        await updateCalculatedNodes({ assessment, cycle }, client)
        // eslint-disable-next-line no-await-in-loop
        await validateNodes({ assessment, cycle }, client)
        // eslint-disable-next-line no-await-in-loop
        await cleanupCountryProps({ assessment, cycle }, client)
        // eslint-disable-next-line no-await-in-loop
        await migrateDescriptions({ assessment, cycle }, client)
      }
      await migratePrimaryForestData({ assessment }, client)
      await migrateMessageBoard({ assessment }, client)
      await postMetadataFix({ assessment }, client)
      await deleteInvalid2025Nodes({ assessment }, client)
      await deleteAtlantisData({ assessment }, client)
    })

    const end = new Date().getTime()
    // eslint-disable-next-line no-console
    console.log('========== END ', end, 'ELAPSED (s)', (end - start) / 1000)
    process.exit(0)
  })
})
