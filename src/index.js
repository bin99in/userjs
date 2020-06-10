// ==UserScript==
// @name         sites
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// ==/UserScript==

// @require      file:///Users/bin99/Project/site-user-script/dist/userscript.bundle.js
import SiteConfig from './classes/SiteConfig.js'
import './sites/zhihu.com.user.js'
import './sites/nintendo.com.user.js'
import './sites/jianshu.com.user.js'
import './sites/bilibili.com.user.js'
import './sites/jd.com.user.js'
import './sites/youneed.win.user.js'
import './sites/google.cn.user.js'

SiteConfig.init()
