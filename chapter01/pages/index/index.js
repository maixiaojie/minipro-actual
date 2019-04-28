//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    city: '',
    wind_dir: '',
    tmp: '',
    fl: '',
    hum: '',
    pcpn: '',
    pres: '',
    vis: '',
    wind_deg: '',
    wind_sc: '',
    wind_spd: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getLocation()
  },
  getLocation: function () {
    let that = this
    wx.getLocation({
      success: function (res) {
        let latitude = res.latitude;
        let longitude = res.longitude;
        that.getData(latitude, longitude)
      },
    })
  },
 getData(latitude, longitude) {
    var that = this
    var url = `https://free-api.heweather.net/s6/weather/now?location=${longitude},${latitude}&key=HE1904281824011523`;
    util.http(url, {}).then(res => {
      that.setData({
        city: res.HeWeather6[0].basic.location,
        wind_dir: res.HeWeather6[0].now.wind_dir,
        tmp: res.HeWeather6[0].now.tmp,
        fl: res.HeWeather6[0].now.fl,
        hum: res.HeWeather6[0].now.hum,
        pcpn: res.HeWeather6[0].now.pcpn,
        pres: res.HeWeather6[0].now.pres,
        vis: res.HeWeather6[0].now.vis,
        wind_deg: res.HeWeather6[0].now.wind_deg,
        wind_sc: res.HeWeather6[0].now.wind_sc,
        wind_spd: res.HeWeather6[0].now.wind_spd
      })
    })
  }

})
