import axios from 'axios'
import { applicationError } from '../applicationError/actions'

export const listCountries = 'navigation/country/list'
export const fetchCountryOverviewStatusCompleted = 'navigation/status/completed'
export const changeAssessmentStatusInitiated = 'navigation/changeAssessmentStatusInitiated'

export const getCountryList = () => dispatch => {
  axios.get('/api/country/all').then(resp => {
    dispatch({type: listCountries, countries: resp.data})
  })
}

export const fetchCountryOverviewStatus = countryIso => dispatch => {
  axios.get(`/api/country/overviewStatus/${countryIso}`).then(resp => {
    dispatch({type: fetchCountryOverviewStatusCompleted, status: resp.data})
  })
}

export const changeAssessmentStatus = (countryIso, assessmentType, status) => dispatch => {
  dispatch({type: changeAssessmentStatusInitiated, assessmentType})
  axios.post(`/api/assessment/status/${countryIso}?assessmentType=${assessmentType}&status=${status}`)
    .then(() => {
      fetchCountryOverviewStatus(countryIso)(dispatch)
    })
    .catch((err) => dispatch(applicationError(err)))
}
