const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const wxRequest = (url, config, resolve, reject) => {
  let {
    data = {},
    contentType = 'application/json',
    method = 'GET',
    ...other
  } = { ...config }
  wx.request({
    url: url,
    data: { ...data },
    method: method,
    header: {
      'content-type': contentType
    },
    success: (data) => resolve(data),
    fail: (err) => reject(err)
  })
}
const http = (url, config, resolve, reject) => {
  var promise = new Promise((resolve, reject) => {
    wxRequest(url, config, resolve, reject)
  })
  // return promise
  return promise.then(res => {
    return res.data
  }).catch(err => {
    console.log(err)
  })
}
module.exports = {
  formatTime: formatTime,
  http: http
}
