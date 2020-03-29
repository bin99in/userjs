/* global unsafeWindow */

export default class SiteConfig {
  static instances = []
  url = new URL(unsafeWindow.document.URL)

  constructor (hostname, pathnameMap) {
    this.hostname = hostname
    this.pathnameMap = pathnameMap
    SiteConfig.instances.push(this)
  }

  static init() {
    SiteConfig.instances.forEach(instance => instance.init())
  }

  init () {
    if (this.hostname !== this.url.hostname) return
    // 精确匹配
    const alwaysLoad = this.pathnameMap.get('')
    alwaysLoad && alwaysLoad()
    const handler = this.pathnameMap.get(this.url.pathname)
    handler && handler()
    // 正则匹配
    for(const key of this.pathnameMap.keys()){
      if (key instanceof RegExp && key.test(this.url.pathname)){
        const handler = this.pathnameMap.get(key)
        handler && handler()
      }
    }
  }
}
// there are two methods to make a front-end router, through history API or hash field.
// if applying this class to single page application, must be concerned above.
// so far, I don't implement this.
