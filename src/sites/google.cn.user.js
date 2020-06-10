/* global unsafeWindow */

import SiteConfig from '../classes/SiteConfig.js'

const unsafeDoc = unsafeWindow.document

const config = new Map([
  ['translate.google.cn', new Map([
    [new RegExp(''), () => {
      pasteProcess()
    }]
  ])]
])

// 拦截paste事件，将空白符号、连续空白符替换为单个空格，始终粘贴到输入框
function pasteProcess() {
  const config = {
    inputAreaSelector: '#source'
  }
  const cache = {
    inputArea: document.querySelector('#source')
  }
  const action = {
    paste(e, str, selectMode = 'end') {
      str = str || (e.clipboardData || window.clipboardData)
        .getData('text')
        .replace(/\s+/g, ' ')
      const ele = cache.inputArea
      if (unsafeDoc.activeElement !== cache.inputArea) {
        ele.select()
      }
      ele.setRangeText(str, ele.selectionStart, ele.selectionEnd, selectMode)
    }
  }
  window.addEventListener('paste', function(e) {
    e.preventDefault()
    action.paste(e)
  })
}

export default new SiteConfig(config)
