import * as R from 'ramda'
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Route from 'route-parser'
import { alpha3ToAlpha2, getName as getCountryName } from 'i18n-iso-countries'

import { Link } from './../link'
import { follow } from './../router/actions'
import {
  getCountryList,
  fetchCountryOverviewStatus,
  changeAssessmentStatus,
  navigationScroll
} from './actions'
import { annualItems, fiveYearItems } from './items'
import { mostPowerfulRole } from '../../common/countryRole'
import { getAllowedStatusTransitions } from '../../common/assessment'

import './style.less'

class CountrySelectionItem extends React.Component {

  constructor (props) {
    super(props)
    this.state = {isOpen: false}
  }

  render () {
    const name = this.props.name
    const role = this.props.role
    const countries = this.props.countries || []
    const i18n = this.props.i18n
    const style = {
      backgroundImage: `url('/img/flags/${(alpha3ToAlpha2(name) || '').toLowerCase()}.svg'`
    }

    return <div className="nav__country-item" onClick={() => {
      this.setState({isOpen: R.not(this.state.isOpen)})
      if (R.isEmpty(countries)) {
        this.props.listCountries()
      }
    }}>
      <div className="nav__country-flag" style={style}></div>
      <div className="nav__country-info">
        <span className="nav__country-name">{getCountryName(name, i18n.language)}</span>
        <span className="nav__country-role">{role}</span>
      </div>
      <svg className="icon">
        <use xlinkHref="img/icon.svg#icon-small-down"/>
      </svg>
      <CountryList isOpen={this.state.isOpen} countries={countries} currentCountry={name}
                   i18n={i18n}/>
    </div>
  }
}

const CountryList = ({isOpen, countries, currentCountry, i18n}) => {
  if (!isOpen) return <noscript/>
  return <div className="nav__country-list">
    <div className="nav__country-list-content">
      {
        countries.map(c => <CountryRow key={c.countryIso} selectedCountry={currentCountry}
                                       country={c} i18n={i18n}/>)
      }
    </div>
  </div>
}

const CountryRow = ({selectedCountry, country, i18n}) =>
  <Link
    to={`/country/${country.countryIso}`}
    className={`nav__country-list-item ${R.equals(selectedCountry, country.countryIso) ? 'selected' : ''}`}>
    <div className="nav__country-list-item-name">
      {getCountryName(country.countryIso, i18n.language)}
    </div>
    {
      // Editing is not shown at all, let's not take space from the narrow dropdown in that case
      country.assessmentStatus !== 'editing'
        ? <span
        className="nav__country-list-item-assessment-status">{i18n.t(`navigation.assessmentStatus.${country.assessmentStatus}.label`)}</span>
        : null
    }

  </Link>

const changeStateLink = (countryIso, assessmentType, currentStatus, targetStatus, changeAssessmentStatus, direction, i18n) => {

  const label = currentStatus === 'changing'
    ? i18n.t('navigation.assessmentStatus.changing.label')
    : i18n.t(`navigation.assessmentStatus.${targetStatus}.${direction}`)

  return <a
    className={targetStatus ? 'nav__primary-assessment-action' : 'nav__primary-assessment-action--disabled'}
    href="#"
    onClick={(evt) => {
      evt.preventDefault()
      if (targetStatus) changeAssessmentStatus(countryIso, assessmentType, targetStatus)
    }}>{label}</a>
}

const PrimaryItem = ({label, countryIso, assessmentType, assessmentStatuses, changeAssessmentStatus, userInfo, i18n}) => {
  if (!countryIso || !userInfo)
    return <noscript/>

  const currentAssessmentStatus = R.path([assessmentType], assessmentStatuses)
  const allowedTransitions = getAllowedStatusTransitions(mostPowerfulRole(countryIso, userInfo), currentAssessmentStatus)
  const nextAssessmentStatus = allowedTransitions.next
  const previousAssessmentStatus = allowedTransitions.previous

  return <div className="nav__primary-item">
    <span className="nav__primary-label">{label}</span>
    {
      currentAssessmentStatus
        ? <span
        className="nav__assessment-status">{i18n.t(`navigation.assessmentStatus.${currentAssessmentStatus}.label`)}</span>
        : null
    }
    {
      previousAssessmentStatus
        ? <span className="nav__to-previous-assessment-status">(
        {
          changeStateLink(countryIso, assessmentType, currentAssessmentStatus, previousAssessmentStatus, changeAssessmentStatus, 'previous', i18n)
        }
        )</span>
        : null
    }
    {
      changeStateLink(countryIso, assessmentType, currentAssessmentStatus, nextAssessmentStatus, changeAssessmentStatus, 'next', i18n)
    }
  </div>
}

const ReviewStatus = ({status, userInfo}) =>
  status.issuesCount > 0
    ? <div
    className={`nav__secondary-has-open-issue ${R.propOr(null, 'id', userInfo) !== status.lastCommentUserId ? 'issue-last-comment-other-user' : ''}`}/>
    : null

const NationalDataItem = ({path, countryIso, pathTemplate = '/tbd', status = {count: 0}, label, userInfo}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})

  return <Link className={`nav__link-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
               to={linkTo}>
    <span className="nav__link-label">{label}</span>
    <span className="nav__link-item-status">{status.count}</span>
    <span className="nav__link-review-status">
      <ReviewStatus status={status} userInfo={userInfo}/>
    </span>
    <span className="nav__link-error-status">
      {status.errors ? <svg className="icon icon-middle icon-red">
        <use xlinkHref="img/icon.svg#icon-alert"/>
      </svg>
        : null
      }
    </span>
  </Link>
}

const SecondaryItem = ({path, countryIso, order, pathTemplate = '/tbd', label, status, userInfo}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})
  const isTodoItem = pathTemplate.indexOf('/todo') !== -1
  const secondaryTextClass = isTodoItem ? 'nav__disabled-menu-item-text' : ''

  return <Link className={`nav__secondary-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
               to={linkTo}>
    <span className={`nav__secondary-order ${secondaryTextClass}`}>{order}</span>
    <div>
      <span className={`nav__secondary-label ${secondaryTextClass}`}>{label}</span>
    </div>
    <div className='nav__secondary-status-content'>
      <ReviewStatus status={status} userInfo={userInfo}/>
    </div>
  </Link>
}

const roleLabel = (countryIso, userInfo, i18n) => i18n.t(mostPowerfulRole(countryIso, userInfo).labelKey)

class Nav extends React.Component {

  constructor () {
    super()
  }

  componentDidMount () {
    const content = ReactDOM.findDOMNode(this.refs.scroll_content)
    if (this.props.scrollPosition) {
      content.scrollTop = this.props.scrollPosition
    }
  }

  render () {
    const status = R.defaultTo({}, this.props.status)
    const getReviewStatus = section => R.pipe(
      R.defaultTo({}),
      R.prop(section),
      R.defaultTo({issuesCount: 0})
    )(status.reviewStatus)

    return <div className="main__nav-wrapper">
      <div className="main__nav">
        <CountrySelectionItem name={this.props.country}
                              countries={this.props.countries}
                              listCountries={this.props.getCountryList}
                              role={roleLabel(this.props.country, this.props.userInfo, this.props.i18n)}
                              i18n={this.props.i18n}/>
        <div className="nav__link-list" ref="scroll_content" onScroll={() => {
          const content = ReactDOM.findDOMNode(this.refs.scroll_content)
          this.props.navigationScroll(content.scrollTop)
        }}>
          <div>
            <NationalDataItem label={this.props.i18n.t('nationalDataPoint.nationalData')}
                              countryIso={this.props.country}
                              status={R.merge(getReviewStatus('NDP'), status.odpStatus)}
                              path={this.props.path}
                              pathTemplate="/country/:countryIso/odps"
                              userInfo={this.props.userInfo}/>
            <PrimaryItem label={this.props.i18n.t('navigation.annuallyReported')}
                         countryIso={this.props.country}
                         assessmentType="annuallyReported"
                         assessmentStatuses={status.assessmentStatuses}
                         changeAssessmentStatus={this.props.changeAssessmentStatus}
                         userInfo={this.props.userInfo}
                         i18n={this.props.i18n}/>
            {
              annualItems(this.props.i18n).map(v => <SecondaryItem path={this.props.path}
                                                                   key={v.label}
                                                                   goTo={this.props.follow}
                                                                   countryIso={this.props.country}
                                                                   status={getReviewStatus(v.section)}
                                                                   userInfo={this.props.userInfo}
                                                                   {...v} />
              )
            }
            <PrimaryItem label={this.props.i18n.t('navigation.fiveYearCycle')}
                         countryIso={this.props.country}
                         assessmentType="fiveYearCycle"
                         assessmentStatuses={status.assessmentStatuses}
                         changeAssessmentStatus={this.props.changeAssessmentStatus}
                         userInfo={this.props.userInfo}
                         i18n={this.props.i18n}/>
            {
              fiveYearItems(this.props.i18n).map(v => <SecondaryItem path={this.props.path}
                                                                     key={v.label}
                                                                     goTo={this.props.follow}
                                                                     countryIso={this.props.country}
                                                                     status={getReviewStatus(v.section)}
                                                                     userInfo={this.props.userInfo}
                                                                     {...v} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  }
}

class NavigationSync extends React.Component {

  componentWillMount () {
    this.props.fetchCountryOverviewStatus(this.props.country)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.country, next.country)) {
      this.props.fetchCountryOverviewStatus(next.country)
    }
  }

  render () {
    return <Nav {...this.props} />
  }
}

const mapStateToProps = state => R.pipe(R.merge(state.navigation), R.merge(state.router))(state.user)

export default connect(mapStateToProps, {
  follow,
  getCountryList,
  fetchCountryOverviewStatus,
  changeAssessmentStatus,
  navigationScroll
})(NavigationSync)
