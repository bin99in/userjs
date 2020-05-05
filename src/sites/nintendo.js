/* global unsafeWindow Event */

import SiteConfig from '../classes/SiteConfig.js'

const unsafeDoc = unsafeWindow.document
const config = new Map([
  ['accounts.nintendo.com', new Map([
    ['/profile/edit', () => {
      addCityButton()
    }]
  ])]
])

/** 页面上添加城市按键，方便换区 */
function addCityButton () {
  const cityMap = new Map([
    [153, '美国'],
    [102, '墨西哥'],
    [75, '日本'],
    [166, '香港']
  ])
  const targetName = 'country_id'
  // create button
  const fragment = document.createElement('DocumentFragment')
  for (const [value, city] of cityMap.entries()) {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = city
    button.addEventListener('click', function (e) {
      citySelect.value = value
      citySelect.dispatchEvent(new Event('change'))
    })
    fragment.appendChild(button)
  }
  // add it to document
  const citySelect = unsafeDoc.querySelector(`[name=${targetName}]`)
  const line = citySelect.parentNode
  line.parentNode.insertBefore(fragment, line)
}

export default new SiteConfig(config)
