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
  const loadInterval = 500
  const clickInterval = 200
  const fullscreenBtnName = '.bilibili-player-video-btn-fullscreen'
  const pauseBtnName = '.bilibili-player-iconfont-start'
  const fullscreenBtn = unsafeDoc.querySelector(fullscreenBtnName)
  const pauseBtn = unsafeDoc.querySelector(pauseBtnName)
  // 未获取到Btn，推迟后继续获取（视频控件在加载）
  if (!fullscreenBtn) {
    setTimeout(videoFullscreen, loadInterval)
    return
  }
  const cache = {
    priorClickTimestamp: 0,
    timer: null
  }
  const videoEle = unsafeDoc.querySelector('video')
  videoEle.addEventListener('click', function (e) {
    e.stopPropagation()
    if (Date.now() - cache.priorClickTimestamp < clickInterval) {
      fullscreenBtn.click()
      clearTimeout(cache.timer)
    } else {
      clearTimeout(cache.timer)
      cache.priorClickTimestamp = Date.now()
      cache.timer = setTimeout(() => pauseBtn.click(), clickInterval)
    }
  }, { capture: true })
}

export default new SiteConfig(config)
