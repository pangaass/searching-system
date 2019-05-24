Page({
  data: {
    results: [],
    queryStr: ""
  },
  onLoad: function(res) {
    var that = this;
    wx.showLoading({
      title: '正在查询中..',
    });
    that.setData({
      queryStr: res.queryStr
    })
    wx.request({
      url: 'http://192.144.161.67:3000/search?query=' + res.queryStr,
      method: "GET",
      success: function (res) {
        console.log(res);
        if (res.statusCode != 200) {
          wx.showToast({
            title: 'Server Error',
            icon: 'warning',
          })
        } else {
          let results = res.data.hits.hits;
          console.log(results)
          for (let i = 0; i < results.length; i++) {
            results[i]._source.article = results[i]._source.article.substr(0, 80)
          }
          that.setData({
            results: results,
          })
        }
      },
      complete: function(res) {
        wx.hideLoading();
      }
    });
  },
  setQueryStr: function(e) {
    this.setData({
      queryStr: e.detail.value
    })
    console.log(this.data.queryStr)
  },
  search: function() {
    var that = this;
    if (that.data.queryStr.length == 0) {
      wx.showToast({
        title: '字符串不能为空..',
        icon: 'loading',
      })
    } else {
      wx.showLoading({
        title: '正在查询中..',
      });
      wx.request({
        url: 'http://192.144.161.67:3000/search?query=' + that.data.queryStr,
        method: "GET",
        success: function(res) {
          console.log(res);
          if (res.statusCode != 200) {
            wx.showToast({
              title: 'Server Error',
              icon: 'warning',
            })
          } else {
            let results = res.data.hits.hits;
            console.log(results)
            for (let i = 0; i < results.length; i++) {
              results[i]._source.article = results[i]._source.article.substr(0, 80)
            }
            that.setData({
              results: results,
            })
          }
        },
        complete: function(res) {
          wx.hideLoading();
        }
      });
    }
  },
  toWebView:function(id){
    id = new Number(id.currentTarget.dataset.id);
    console.log(id);
    var that = this;
    var url = that.data.results[id]._source.url;
    console.log(url);
    wx.navigateTo({
      url: '../webview/webview?url='+url,
    })
  }
})