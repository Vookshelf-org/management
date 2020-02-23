const path = require('path')

const rootDir = path.resolve(__dirname)
const srcDir = path.resolve(rootDir, 'src')

module.exports = {
  webpack: config => {
    config.resolve.alias['~'] = srcDir
    config.resolve.alias['~~'] = rootDir
    return config
  },
}
