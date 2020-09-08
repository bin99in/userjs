/* global unsafeWindow */

import SiteConfig from '../classes/SiteConfig.js'

const unsafeDoc = unsafeWindow.document
const config = new Map([
  ['www.bilibili.com', new Map([
    [new RegExp(''), () => {
    }],
    [new RegExp('^(/video/)|(/bangumi/)'), () => {
      videoFullscreen()
      tweakSpeed()
    }]
  ])]
])

/** 双击全屏 */
function videoFullscreen () {
  const config = {
    maxClickInterval: 500,
    getFullscreenBtn() {
      const fullscreenBtnName = '.bilibili-player-video-btn-fullscreen'
      return document.querySelector(fullscreenBtnName)
    }
  }
  const cache = {
    timeId: null,
    lastClickTimestamp: 0,
    isDispatchManually: false
  }
  const action = {
    firstClick(e) {
      cache.lastClickTimestamp = Date.now()
      cache.timeId = setTimeout(()=>{
        const { target, type, bubbles, cancelable, composed } = e
        const event = new Event(type, { bubbles, cancelable, composed })
        cache.isDispatchManually = true
        target.dispatchEvent(event)
        cache.isDispatchManually = false
      }, 300)
    },
    doubleClick() {
      config.getFullscreenBtn().click()
    }
  }

  unsafeDoc.body.addEventListener('click', function (e) {
    if (!e.target.matches('video') || cache.isDispatchManually) return
    e.stopImmediatePropagation()
    if (cache.timeId) clearTimeout(cache.timeId)
    if (Date.now() - cache.lastClickTimestamp > config.maxClickInterval) {
      action.firstClick(e)
    } else {
      action.doubleClick()
    }
  }, { capture: true })
}

/** 切换播放速度 shift + arrow left | arrow right  */
function tweakSpeed() {
  const config = {
    modifier:  'Shift',
    speedBtnClassName: '.bilibili-player-video-btn-speed-menu-list',
    getTargetSpeedBtn() {
      const selector = config.speedBtnClassName + '[data-value="' + cache.currentSpeed + '"]';
      return unsafeDoc.querySelector(selector)
    }
  }
  const cache = {
    isModifierDown: false,
    currentSpeed: 1
  }
  const action = {
    speedUp() {
      if (cache.currentSpeed < 2) {
        const fn = () => {
          cache.currentSpeed += 0.25
          config.getTargetSpeedBtn().click()
        }
        try {
          fn()
        } catch (e) {
          fn()
        }
      }
    },
    speedDown() {
      if (cache.currentSpeed > 0.25) {
        const fn = () => {
          cache.currentSpeed -= 0.25
          config.getTargetSpeedBtn().click()
        }
        try {
          fn()
        }
        catch (e) {
          fn()
        }
      }
    }
  }

  // 修饰符flag
  unsafeDoc.body.addEventListener('keydown', function(e) {
    if (e.key === config.modifier) {
      cache.isModifierDown = true
    }
  }, { capture: true })
  unsafeDoc.body.addEventListener('keyup', function(e) {
    if (e.key === config.modifier) {
      cache.isModifierDown = false
    }
  }, { capture: true })

  // 派发
  unsafeDoc.body.addEventListener('keydown', function(e) {
    if (cache.isModifierDown) {
      switch(e.key){
      case 'ArrowRight':
        e.stopImmediatePropagation()
        action.speedUp()
        break
      case 'ArrowLeft':
        e.stopImmediatePropagation()
        action.speedDown()
        break
      default:
        void 0
      }
    }
  }, { capture: true })
}

export default new SiteConfig(config)
