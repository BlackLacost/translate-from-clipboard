const path = require('node:path')
const { fileURLToPath } = require('node:url')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

// Binaries from: https://github.com/sindresorhus/win-clipboard
const windowBinaryPath = path.resolve(
  __dirname,
  `../vendor/clipboard_x86_64.exe`,
)

const clipboard = {
  paste: async () => {
    const { stdout, stderr } = await exec(`${windowBinaryPath} --paste`)
    console.error(stderr)
    return stdout
  },
}

module.exports = clipboard
