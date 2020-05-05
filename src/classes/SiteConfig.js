// there are two methods to make a front-end router, through history API or hash field.
// if applying this class to single page application, must be concerned above.
// so far, I don't implement this.

/* global unsafeWindow */

export default class SiteConfig {
  static instances = []
  url = new URL(unsafeWindow.document.URL)

  constructor (config) {
    this.config = config
    SiteConfig.instances.push(this)
  }

  static init() {
    SiteConfig.instances.forEach(instance => instance.init())
  }

  #match (beMatchedString, map) {
    const matched = []
    for (const [key, val] of map.entries()){
      if (typeof key === 'string'){
      // 精确匹配
        key === beMatchedString && matched.push(val)
      } else if (key instanceof RegExp){
      // 正则匹配
        key.test(beMatchedString) && matched.push(val)
      }
    }
    return matched
  }

  init () {
    const matchedpathMaps = this.#match(this.url.hostname, this.config);
    const matchedMethods = matchedpathMaps.reduce((acc, pathMap) => {
      const methods = this.#match(this.url.pathname, pathMap)
      return acc.concat(methods)
    }, []);
    matchedMethods.forEach(item => item())
  }
}
