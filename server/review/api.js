const crypto = require('crypto')
const R = require('ramda')

const db = require('../db/db')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr} = require('../utils/requestUtils')
const reviewRepository = require('./reviewRepository')
const auditRepository = require('./../audit/auditRepository')

module.exports.init = app => {

  app.post('/review/:issueId', (req, res) => {
    db.transaction(reviewRepository.getIssueCountryAndSection, [req.params.issueId]).then(commentInfo => {
      db.transaction(auditRepository.insertAudit,
        [req.user.id, 'createComment', commentInfo.countryIso, commentInfo.section, {issueId: req.params.issueId}])
      db.transaction(reviewRepository.createComment, [req.params.issueId, req.user, req.body.msg, 'opened'])
        .then(result => res.json({}))
        .catch(err => sendErr(res, err))
    })
  })

  app.get('/review/:countryIso/:section/summary', (req, res) => {
    checkCountryAccessFromReqParams(req)
    reviewRepository
      .getIssuesSummary(req.params.countryIso, req.params.section, req.query.target)
      .then(result => res.json(result))
      .catch(err => sendErr(res, err))
  })

  app.post('/review/:countryIso/:section', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const target = req.query.target ? req.query.target.split(',') : []
    db.transaction(auditRepository.insertAudit,
      [req.user.id, 'createIssue', req.params.countryIso, req.params.section, {params: target}])
    db.transaction(
      reviewRepository.createIssueWithComment,
      [req.params.countryIso, req.params.section, {params: target}, req.user.id, req.body.msg])
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/review/:countryIso/:section', (req, res) => {
    checkCountryAccessFromReqParams(req)
    reviewRepository.getIssueComments(req.params.countryIso, req.params.section)
      .then(result => {
        const target = req.query.target && req.query.target.split(',')
        const issues = R.map(issue => {
          const diff = R.pipe(R.path(['target', 'params']), R.difference(target))(issue)
          return R.isEmpty(diff) ? issue : []
        }, result)
        res.json(
          R.pipe(
            R.reject(R.isEmpty),
            R.map(
              comment =>
                R.merge(R.omit('email', comment), // leave out email
                  R.pipe( // calculate email hash for gravatar
                    R.prop('email'),
                    v => crypto.createHash('md5').update(v).digest('hex'),
                    h => ({hash: h})
                  )(comment)
                )
            )
          )(issues)
        )
      })
      .catch(err => sendErr(res, err))
  })

  app.delete('/review/:countryIso/comments/:commentId', (req, res) => {
    db.transaction(reviewRepository.getCommentCountryAndSection, [req.params.commentId]).then(commentInfo => {
      db.transaction(auditRepository.insertAudit,
        [req.user.id, 'deleteComment', commentInfo.countryIso, commentInfo.section, {commentId: req.params.commentId}])
      db.transaction(reviewRepository.markCommentAsDeleted, [req.params.commentId, req.user])
        .then(() => res.json({}))
        .catch(err => sendErr(res, err))
    })
  })

  app.post('/issue/markAsResolved', (req, res) => {
    db.transaction(reviewRepository.getIssueCountryAndSection, [req.query.issueId]).then(commentInfo => {
      db.transaction(auditRepository.insertAudit,
        [req.user.id, 'markAsResolved', commentInfo.countryIso, commentInfo.section, {issueId: req.query.issueId}])
      db.transaction(reviewRepository.markIssueAsResolved, [req.query.issueId, req.user])
        .then(() => res.json({}))
        .catch(err => sendErr(res, err))
    })
  })
}
