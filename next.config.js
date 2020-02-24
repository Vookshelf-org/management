const path = require('path')

const rootDir = path.resolve(__dirname)
const srcDir = path.resolve(rootDir, 'src')

module.exports = {
  webpack: config => {
    /* eslint-disable no-param-reassign */
    config.resolve.alias['~'] = srcDir
    config.resolve.alias['~~'] = rootDir
    return config
    /* eslint-enable no-param-reassign */
  },
}
