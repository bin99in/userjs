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

// 粘贴时将空白符号、连续空白符替换为单个空格
function pasteProcess() {
  const inputArea = document.querySelector('#source')
  inputArea.addEventListener('paste', function(e) {
    e.preventDefault()
    const originPaste = (e.clipboardData || window.clipboardData).getData('text');
    const t = e.target
    const replacedPaste = originPaste.replace(/\s+/g, ' ')
    t.setRangeText(replacedPaste, t.selectionStart, t.selectionEnd, 'end')
  })
}

export default new SiteConfig(config)
