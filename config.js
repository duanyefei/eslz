//接口授权码 必须设置不然取不到数据
const server = 'https://api.nb82.com/SecondHand/Wx';
const upFiles = `https://api.nb82.com/SecondHand/Wx/get_img`;

let initTheme = {
  primaryColor: '#f66b0c',
  primaryBg: '#fff',
  navigationBarFontColor: '#fff',
  navigationBarBgColor: '#f66b0c'
}


function getTheme (theme) {
  theme = {...initTheme, ...theme}
  let primaryColor = theme.primaryColor
  let primaryBg = theme.primaryBg
  let navigationBarFontColor = theme.navigationBarFontColor
  let navigationBarBgColor = theme.navigationBarBgColor

  //设置全局的样式，让其他页面使用
  let styles = {
    primaryText: `color: ${primaryColor};`,
    primaryBg: `background-color: ${primaryBg};`,
    primaryStyle: `color: ${primaryColor};background-color: ${primaryBg};`,
    primaryReverseStyle: `color: ${primaryBg};background-color: ${primaryColor};`
  }

  //设置头部背景色
  // wx.setNavigationBarColor({
  //   frontColor: navigationBarFontColor,
  //   backgroundColor: navigationBarBgColor
  // })

  return {
    ...theme,
    styles
  }
}

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = '#####';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {

        // 上传图片 上传视频
        upFiles: `https://api.nb82.com/SecondHand/Wx/get_img`,
    }
};

module.exports = config;


module.exports = {
  server,
  upFiles,
  defaultTheme: getTheme(initTheme),
  getTheme,
}