let httpUtil = require('../utils/http')
let config = require('../config')

let server = httpUtil.server(config.server)

function getAppSetting () {
  return server.get('/setting')
}

let themeCache = null
function getAppTheme () {
  if (themeCache == null) {
    return server.get('/appTheme').then(data => {
      themeCache = data
      return config.getTheme(data)
    })
  } else {
    return Promise.resolve(config.getTheme(themeCache))
  }
}

module.exports = {
  getAppSetting,
  getAppTheme
}