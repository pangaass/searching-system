Page({
  data: {
    queryStr: "",
  },
  setQueryStr: function(e) {
    this.setData({
      queryStr: e.detail.value
    })
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
      wx.navigateTo({
        url: '../details/details?queryStr=' + that.data.queryStr,
      })
    }
  }
})