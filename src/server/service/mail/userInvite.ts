import { createI18nPromise } from '@i18n/i18nFactory'

import { ClientRoutes } from '@meta/app'
import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { RoleName, User, UserRole, Users } from '@meta/user'

import { sendMail } from './mail'

export const userInvite = async (props: {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: string
  role: UserRole<RoleName>
  url: string
  userToInvite: User
}) => {
  const { assessmentName, countryIso, cycleName, role, url, userToInvite } = props

  const i18n = await createI18nPromise('en')

  const link = `${url}${ClientRoutes.Assessment.Cycle.Login.Invitation.getLink({ assessmentName, cycleName })}${
    role.invitationUuid ? `?invitationUuid=${role.invitationUuid}` : ''
  }`

  const countryName = i18n.t(`area.${countryIso}.listName`)

  const roleName = i18n.t(Users.getI18nRoleLabelKey(role.role))

  const emailProps = {
    country: countryName,
    assessmentName,
    cycleName,
    invitedUser: userToInvite.name,
    role: roleName,
    link,
    url,
  }

  const invitationEmail = {
    to: userToInvite.email,
    subject: i18n.t('userManagement.invitationEmail.subject', { country: countryName }),
    text: i18n.t('userManagement.invitationEmail.textMessage', emailProps),
    html: i18n.t('userManagement.invitationEmail.htmlMessage', emailProps),
  }

  await sendMail(invitationEmail)
}
