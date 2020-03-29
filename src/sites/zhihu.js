/* global unsafeWindow GM_addStyle */

// ==UserScript==
// @grant        GM_addStyle
// ==/UserScript==

import SiteConfig from '../classes/SiteConfig.js'

const unsafeDoc = unsafeWindow.document
const hostname = 'www.zhihu.com'
const pathnameMap = new Map()
pathnameMap.set('', () => {
  blockPopups()
  directFollowLink()
})

function blockPopups () {
  GM_addStyle('.Modal-wrapper.undefined.Modal-enter-done{display: none !important;}')
  const timer = setInterval(() => {
    const element = unsafeDoc.body.lastChild
    const isContainPopups = element.querySelector('.Modal-wrapper')
    if (isContainPopups) {
      element.querySelector('[aria-label="关闭"]').click()
      clearInterval(timer)
    }
  }, 60)
}

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

export default new SiteConfig(
  hostname,
  pathnameMap
)
