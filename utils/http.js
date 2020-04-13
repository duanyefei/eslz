const app = getApp()

function fetch (url, data, method) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: {"Content-Type":"application/x-www-form-urlencoded"},
      data: data,
      method: method ? method : 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        resolve(res.data)
      },
      fail: function (error) {
        console.error(error)
        reject(error)
      }
    })
  })
}

function get (url, data) {
  return fetch(url, data, 'GET')
}

function post (url, data) {
  return fetch(url, data, 'POST')
}

function server (serverUrl) {
  return {
    get: function (path, data) {
      return get(serverUrl + path, data)
    },
    post: function (path, data) {
      return post(serverUrl + path, data)
    }
  }
}

module.exports = {
  get,
  post,
  server //server
}
