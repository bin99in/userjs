import SiteConfig from '../classes/SiteConfig.js'

const config = new Map([
  ['passport.jd.com', new Map([
    [new RegExp('^/uc/login'), () => {
      getOutQrcode()
    }]
  ])]
])

function getOutQrcode () {
  const loginTabShowBtn = document.querySelector('.login-tab.login-tab-r')
  const checkLoginBoxIsShown = () => {
    const loginBox = document.querySelector('.login-box')
    return loginBox.style.display === 'block'
  }
  const timer = setInterval(() => {
    loginTabShowBtn.click()
    checkLoginBoxIsShown() && clearInterval(timer)
  }, 100)
}

export default new SiteConfig(config)
