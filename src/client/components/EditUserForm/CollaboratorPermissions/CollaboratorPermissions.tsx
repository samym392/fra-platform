import './CollaboratorPermissions.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'

import { SubSections } from '@meta/assessment'
import { CollaboratorProps, RoleName, UserRole } from '@meta/user'

import { useAssessmentSections, useCycle } from '@client/store/assessment'
import CollaboratorAccessModal from '@client/components/CollaboratorAccessModal'

type Props = {
  userRole: UserRole<RoleName, CollaboratorProps>
}

const CollaboratorPermissions = (props: Props) => {
  const { userRole } = props
  const { t } = useTranslation()
  const cycle = useCycle()
  const sections = useAssessmentSections()

  const options = SubSections.getAnchorsByUuid({ cycle, sections })

  const properties = (userRole.props as CollaboratorProps) || undefined
  const sectionPermissions = Objects.isEmpty(properties) ? 'all' : properties.sections ?? 'none'

  const tableDataPermissions = Object.entries(sectionPermissions)
    .reduce((prev, [k, v]) => (v.tableData ? [...prev, options[k]] : prev), [])
    .sort()
    .join(', ')

  const descriptionsPermissions = Object.entries(sectionPermissions)
    .reduce((prev, [k, v]) => (v.descriptions ? [...prev, options[k]] : prev), [])
    .sort()
    .join(', ')

  const [modalOptions, setModalOptions] = useState<{ open: boolean }>({ open: false })

  const _onEditPermissionsClick = () => {
    setModalOptions({ open: true })
  }

  const _onEditPermissionsClose = () => {
    setModalOptions({ open: false })
  }

  return (
    <div className="edit-user__form-item edit-user__form-item-permissions">
      <div className="edit-user__form-label">{t(`userManagement.permissions`)}</div>

      <div className="edit-user__form-field edit-user__form-field-premissions">
        <div className="edit-user__form-field-premission-list">
          {typeof sectionPermissions === 'string' ? (
            t(`contactPersons.${sectionPermissions}`)
          ) : (
            <>
              {tableDataPermissions !== '' && (
                <div>
                  {t('userManagement.permissionNames.tableData')}: {tableDataPermissions}
                </div>
              )}
              {descriptionsPermissions !== '' && (
                <div>
                  {t('userManagement.permissionNames.descriptions')}: {descriptionsPermissions}
                </div>
              )}
            </>
          )}
        </div>

        <button className="btn-xs btn-primary" onClick={_onEditPermissionsClick} type="button">
          {t('userManagement.editPermissions')}
        </button>
      </div>

      <CollaboratorAccessModal open={modalOptions.open} userRole={userRole} onClose={_onEditPermissionsClose} />
    </div>
  )
}

export default CollaboratorPermissions
