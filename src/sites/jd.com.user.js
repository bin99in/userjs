import SiteConfig from '../classes/SiteConfig.js'

const unsafeDoc = unsafeWindow.document

const config = new Map([
  ['passport.jd.com', new Map([
    [new RegExp('^(/uc/login)|(/new/login)'), () => {
      getOutQrcode()
      quickLogin()
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

/** 若用户名已自动填充，则发生交互时立即登录
    用户没有交互过，脚本无法获取password的value值
 */
function quickLogin() {
  const $ = selector => document.querySelector(selector)
  const isAutofilled = !!document.querySelector('#loginname')
  const login = () => isAutofilled && $('#loginsubmit').click()
  unsafeDoc.addEventListener('mousemove', function(e){
    login()
  }, { capture: true})
  unsafeDoc.addEventListener('click', function(e){
    login()
  }, { capture: true})
  unsafeWindow.addEventListener('keydown', function(e) {
    const hasPwd = !!$('#nloginpwd').value
    isAutofilled && hasPwd && $('#loginsubmit').click()
  }, { capture: true})
}

export default new SiteConfig(config)
