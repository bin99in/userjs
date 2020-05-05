/* global unsafeWindow */

import SiteConfig from '../classes/SiteConfig.js'

const unsafeDoc = unsafeWindow.document

const config = new Map([
  ['www.youneed.win', new Map([
    [new RegExp(''), () => {
    }],
    [new RegExp('^/free-ss'), () => {
      click2copyJson()
    }]
  ])]
])

function click2copyJson () {
  const table = unsafeDoc.querySelector('table')
  const getDatas = () => {
    const colKeyMap = new Map([
      [2, 'server'],
      [3, 'server_port'],
      [4, 'password'],
      [5, 'method']])
    const datas = []
    for (const [col, key] of colKeyMap.entries()) {
      table.querySelectorAll(`td:nth-child(${col})`).forEach((ele, index) => {
        const val = ele.textContent
        if (datas[index]) {
          datas[index][key] = val
        } else {
          datas[index] = {}
          datas[index][key] = val
        }
      })
    }
    return datas.map(item => ({
      ...item,
      local_address: '127.0.0.1',
      local_port: 1080
    }))
  }
  if (table.id !== 'wp-calendar') {
    const datas = getDatas()

    // 点击表头拷贝全部
    table.querySelector('tr').addEventListener('click', function (e) {
      navigator.clipboard.writeText(datas.map(item => JSON.stringify(datas)).join('\n'))
    })

    // 点击表内容拷贝单条
    table.querySelectorAll('tbody>tr').forEach((ele, index) => {
      ele.addEventListener('click', function (e) {
        navigator.clipboard.writeText(JSON.stringify(datas[index], null, '  '))
      })
    })
  }
}

export default new SiteConfig(config)
