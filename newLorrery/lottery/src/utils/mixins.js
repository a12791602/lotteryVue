const mixins = {
  filters: {
    initSfm (mss) {
      let hours = parseInt((mss % (60 * 60 * 24)) / (60 * 60))
      hours = hours > 9 ? hours : `0${hours}`
      let minutes = parseInt((mss % (60 * 60)) / (60))
      minutes = minutes > 9 ? minutes : `0${minutes}`
      let seconds = (mss % 60)
      seconds = seconds > 9 ? seconds : `0${seconds}`
      return `${hours}:${minutes}:${seconds}`
    },
    keepTwoNum (str) {
      if (str) {
        return !str.includes('-') ? (parseInt(str * 100) / 100) : str.split('-').map(v => (parseInt(v * 100) / 100)).join('-')
      }
    }
  }
}
export default mixins
