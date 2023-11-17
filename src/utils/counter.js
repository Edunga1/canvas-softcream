export default class Counter {
  /**
   * @param {number} period
   * @param {function} callback
   */
  constructor(period = 1, callback) {
    this.sequence = 0
    this.period = period
    this.callback = callback
  }

  add() {
    if (++this.sequence % this.period === 0) {
      this.callback()
    }
  }
}
