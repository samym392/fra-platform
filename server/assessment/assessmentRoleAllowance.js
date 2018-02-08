const R = require('ramda')
const {assessmentStatus:status} = require('../../common/assessment')

const roleAllowances = {
  'NONE': {comments: [], data: []},
  'COLLABORATOR': {
    comments: [status.editing],
    data: [status.editing]
  },
  'NATIONAL_CORRESPONDENT': {
    comments: [status.editing, status.review],
    data: [status.editing]
  },
  'REVIEWER': {
    comments: [status.editing, status.review, status.approval],
    data: [status.editing, status.review]
  },
  'ADMINISTRATOR': {
    comments: [status.editing, status.review, status.approval, status.accepted],
    data: [status.editing, status.review, status.approval, status.accepted]
  }
}

export const isUserRoleAllowedToEdit = (role, assessmentStatus, editType) => {
  if (R.isNil(role) || R.isNil(role.role)) return false;
  const allowedStatusesForRole = R.path([role.role, editType], roleAllowances)
  return R.contains(assessmentStatus, allowedStatusesForRole)
}

export const isUserRoleAllowedToEditAssessmentComments = (role, assessmentStatus) =>
  isUserRoleAllowedToEdit(role, assessmentStatus, 'comments')

export const isUserRoleAllowedToEditAssessmentData = (role, assessmentStatus) =>
  isUserRoleAllowedToEdit(role, assessmentStatus, 'data')
