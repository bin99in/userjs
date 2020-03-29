// 搁置
export default class RouterListener {
  constructor (type) {
    this.type = type
  }

  addListener (path, listener) {
    switch (this.type) {
      case 'history':
      {
        break
      }
      case 'hash':
      {
        break
      }
      default:
    }
  }

  removeListener (path, listener) {}
}
