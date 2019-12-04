import React from 'react'
import { connect } from 'react-redux'

import tableSpec, { tableProps } from './tableSpec'

import TraditionalTable from '../../traditionalTable/traditionalTable'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'

const GraduationOfStudentsView = props => {

  const { i18n, match } = props
  const { countryIso } = match.params
  const tableSpecPrint1 = tableSpec(i18n, tableProps.graduationOfStudentsPrint1)
  const tableSpecPrint2 = tableSpec(i18n, tableProps.graduationOfStudentsPrint2)

  return <>

    <h2 className="title only-print">
      7b {i18n.t('graduationOfStudents.graduationOfStudents')} ({i18n.t('graduationOfStudents.average')})
    </h2>

    <div className="fra-view__content">
      <NationalDataDescriptions section={tableProps.graduationOfStudents.name} countryIso={countryIso}/>

      <h2 className="headline no-print">
        {i18n.t('graduationOfStudents.graduationOfStudents')} ({i18n.t('graduationOfStudents.average')})
      </h2>
      <div className="fra-view__section-toolbar">
      </div>

      <TraditionalTable tableSpec={tableSpecPrint1} countryIso={countryIso}/>
      <div className="page-break"/>
      <TraditionalTable tableSpec={tableSpecPrint2} countryIso={countryIso}/>

      <GeneralComments section={tableProps.graduationOfStudents.name} countryIso={countryIso}/>
    </div>
  </>

}

const mapStateToProps = state => ({ i18n: state.user.i18n })

export default connect(mapStateToProps)(GraduationOfStudentsView)
