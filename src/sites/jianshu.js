/* global unsafeWindow */

import SiteConfig from '../classes/SiteConfig.js'

const unsafeDoc = unsafeWindow.document
const config = new Map([
  ['www.jianshu.com', new Map([
    [new RegExp(''), () => {
      directFollowLink()
      setTimeout(() => {
        removeHeaderAndFooter()
      }, 1000)
    }]
  ])]
])

/** 外部链接直接访问 */
function directFollowLink () {
  const queryRefs = () => unsafeDoc.querySelectorAll('a')
  const handler = function (e) {
    const url = new URL(this.href)
    if (url.host === 'link.jianshu.com') {
      const query = url.search.split('?').filter(Boolean).reduce(
        (acc, str) => {
          const pair = str.split('=')
          acc[pair[0]] = pair[1]
          return acc
        }, {})
      this.href = decodeURIComponent(query.t)
    }
  }
  const addHandler = ref => ref.addEventListener('click', handler, { once: true })
  const refs = [...queryRefs()]
  refs.forEach(addHandler)
  setInterval(() => {
    queryRefs().forEach(ref => refs.includes(ref) || refs.push(ref) & addHandler(ref))
  }, 1000)
}

/** 移除头尾，专注内容 */
function removeHeaderAndFooter () {
  const header = unsafeDoc.querySelector('header')
  header.parentNode.removeChild(header)
  const footer = unsafeDoc.querySelector('footer:nth-last-of-type(1)')
  footer.parentNode.removeChild(footer)
}

export default new SiteConfig(config)
