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
import './sites/zhihu.js'
import './sites/nintendo.js'
import './sites/jianshu.js'
import './sites/bilibili.js'

SiteConfig.init()
