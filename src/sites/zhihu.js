/* global unsafeWindow */

// ==UserScript==
// @grant        GM_addStyle
// ==/UserScript==

import SiteConfig from '../classes/SiteConfig.js'

const unsafeDoc = unsafeWindow.document
const config = new Map([
  ['www.zhihu.com', new Map([
    [new RegExp(''), () => {
      blockPopups()
    }]
  ])],
  // 二级域名为zhihu的所用链接
  [new RegExp('(\\w.)+zhihu.com'), new Map([
    [new RegExp(''), () => {
      directFollowLink()
    }]
  ])]
])

/** 未登入时，页面不定时会弹窗提示登入。block
    BUG 有时导致页面无法滚动, Vimium不影响
*/
function blockPopups () {
  // const timer =
  setInterval(() => {
    const body = unsafeDoc.body
    const isContainPopups = body.querySelector('.signFlowModal')
    if (isContainPopups) {
      body.querySelector('[aria-label="关闭"]').click()
      // clearInterval(timer)
    }
  }, 60)
}

/** 外部链接直接访问 */
function directFollowLink () {
  const queryRefs = () => unsafeDoc.querySelectorAll('a')
  const handler = function (e) {
    const url = new URL(this.href)
    if (url.host === 'link.zhihu.com') {
      const query = url.search.split('?').filter(Boolean)
        .reduce((acc, str) => {
          const pair = str.split('=')
          acc[pair[0]] = pair[1]
          return acc
        }, {})
      this.href = decodeURIComponent(query.target)
    }
  }
  const addHandler = ref => ref.addEventListener('click', handler, { once: true })
  const refs = [...queryRefs()]
  refs.forEach(addHandler)
  setInterval(() => {
    queryRefs().forEach(ref => refs.includes(ref) || refs.push(ref) & addHandler(ref))
  }, 1000)
}

export default new SiteConfig(config)
