/* global unsafeWindow */

import SiteConfig from '../classes/SiteConfig.js'

const unsafeDoc = unsafeWindow.document
const config = new Map([
  ['www.bilibili.com', new Map([
    [new RegExp(''), () => {
    }],
    [new RegExp('^/video/'), () => {
      videoFullscreen()
    }]
  ])]
])

/** 添加双击全屏 */
function videoFullscreen () {
  const clickInterval = 300
  const fullscreenBtnName = '.bilibili-player-video-btn-fullscreen'
  const cache = {
    prevClickTimestamp: 0,
    timer: null,
    isExcuteDefault: false
  }
  unsafeDoc.body.addEventListener('click', function (e) {
    const dispatchDefaultAction = () => {
      cache.isExcuteDefault = true
      const { bubbles, cancelable, composed } = e
      const event = new Event(e.type, { bubbles, cancelable, composed })
      e.target.dispatchEvent(event)
    }
    if (cache.isExcuteDefault) {
      // 手动派发的事件，仅取消标记，让这次触发正常冒泡
      cache.isExcuteDefault = false
    } else if (e.target.matches('video')) {
      // 拦截目标元素事件
      clearTimeout(cache.timer)
      e.stopImmediatePropagation()
      if (clickInterval > Date.now() - cache.prevClickTimestamp) {
        // 双击间的间隔符合预设，全屏
        unsafeDoc.querySelector(fullscreenBtnName).click()
      } else {
        // 推迟默认事件执行
        cache.prevClickTimestamp = Date.now()
        cache.timer = setTimeout(() => dispatchDefaultAction(), clickInterval)
      }
    } else {
      // 立即执行，不影响视频控件以外的交互
      dispatchDefaultAction()
    }
  }, { capture: true })
}

export default new SiteConfig(config)
