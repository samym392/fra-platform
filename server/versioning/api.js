const { getVersionById, getAllVersions, addVersion, deleteVersion, getSchemaByName } = require('./versioningRepository')
const { sendErr } = require('../utils/requestUtils')

// TODO: add authentication
module.exports.init = app => {

  app.get('/versioning/', async (req, res) => {
    const versions = await getAllVersions();
    res.json(versions)
  })

  app.post('/versioning/', async (req, res) => {
    const userId = req.user.id
    const { version, timestamp } = req.body
    try {
      if (!version || !timestamp) {
        console.log({
          version,
          timestamp
        })
        throw "Param null at POST/versioninig/"
      }
      addVersion(userId, version, timestamp)
      const versions = await getAllVersions();
      res.json(versions)
    } catch (err) {
      console.log(err)
      sendErr(res, err)
    }
  })


  app.delete('/versioning/:id', async (req, res) => {
    const { id } = req.params
    if (!id) {
      return
    }

    try {
      await deleteVersion(id)
    } catch (error) {
      sendErr(res, error)
    }

    const versions = await getAllVersions();
    res.json(versions)
  })

}
