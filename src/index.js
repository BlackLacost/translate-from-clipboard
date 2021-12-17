const readline = require('node:readline')
const axios = require('axios')
const { notify } = require('node-notifier')
const { paste } = require('./clipboard.js')

async function main() {
  const query = await paste()
  const response = await axios.get(
    `http://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ru&dt=t&q=${query}`,
  )

  const [[[t]]] = response.data
  notify(t)
}

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on('keypress', (charater, key) => {
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause()
  }

  if (key && key.meta && key.name == 'e') {
    main()
  }
})
