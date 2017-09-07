import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import { getIssueSummary, openCommentThread, closeCommentThread } from './actions'

const CommentStatus = ({count, active, issueStatus, hasUnreadIssues, ...props}) => {
  const getIssueStatusCssClass = () =>
    issueStatus === 'resolved'
      ? 'issue-resolved'
      : hasUnreadIssues
      ? 'unread-issue'
      : ''

  return <div {...props} className={`fra-review__issue-status ${active ? 'active' : ''}`}>
    {
      count > 0
        ? <div className={`fra-review__issue-status-count ${getIssueStatusCssClass()}`}>{count}</div>
        : <svg className="icon">
          <use xlinkHref="img/icons.svg#circle-add"/>
        </svg>
    }
  </div>
}

class ReviewIndicator extends React.Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.getIssueSummary(this.props.countryIso, this.props.section, this.props.target)
  }

  componentWillReceiveProps (next) {
    // changing country or target
    if (next.countryIso !== this.props.countryIso || !R.equals(next.target, this.props.target)) {
      this.props.getIssueSummary(next.countryIso, next.section, next.target)
    }
  }

  render () {
    const targetProps = this.props[this.props.target] || {}
    const count = R.isNil(targetProps) ? 0 : targetProps.issuesCount
    const issueStatus = R.isNil(targetProps) ? null : targetProps.issueStatus
    const hasUnreadIssues = R.isNil(targetProps) ? false : targetProps.hasUnreadIssues
    const active = this.props.openThread && this.props.section == this.props.openThread.section && R.equals(this.props.target, this.props.openThread.target) ? true : false

    return <div className="fra-review__add-issue">
      <CommentStatus
        count={count}
        active={active}
        issueStatus={issueStatus}
        hasUnreadIssues={hasUnreadIssues}
        onClick={() => {
          this.props.openCommentThread(this.props.countryIso, this.props.section, this.props.target, this.props.name)
        }}/>
    </div>
  }
}

const mapStateToProps = state => R.merge(state.review, state.user)

export default connect(mapStateToProps, {
  openCommentThread,
  closeCommentThread,
  getIssueSummary
})(ReviewIndicator)
