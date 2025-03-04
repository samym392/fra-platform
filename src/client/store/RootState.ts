import { DataLockState } from '@client/store/ui/dataLock'

import { AssessmentState } from './assessment/stateType'
import { LoginState } from './login/stateType'
import { AssessmentSectionState } from './pages/assessmentSection'
import { DataExportState } from './pages/dataExport'
import { OriginalDataPointState } from './pages/originalDataPoint'
import { AssessmentFilesState } from './ui/assessmentFiles/stateType'
import { GeoState } from './ui/geo/stateType'
import { HomeState } from './ui/home/stateType'
import { MessageCenterState } from './ui/messageCenter/stateType'
import { NavigationState } from './ui/navigation/stateType'
import { NotificationState } from './ui/notification/stateType'
import { ReviewState } from './ui/review'
import { UserManagementState } from './ui/userManagement'
import { UserState } from './user/stateType'

export type RootState = {
  assessment: AssessmentState
  login: LoginState
  user: UserState

  pages: {
    assessmentSection: AssessmentSectionState
    dataExport: DataExportState
    originalDataPoint: OriginalDataPointState
  }

  ui: {
    assessmentFiles: AssessmentFilesState
    dataLock: DataLockState
    home: HomeState
    messageCenter: MessageCenterState
    navigation: NavigationState
    notification: NotificationState
    review: ReviewState
    userManagement: UserManagementState
  }

  geo: GeoState
}
