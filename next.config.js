const path = require("path")

const withImages = require("next-images")

const rootDir = path.resolve(__dirname)
const srcDir = path.resolve(rootDir, "src")

module.exports = withImages({
  webpack: config => {
    /* eslint-disable no-param-reassign */
    config.resolve.alias["~"] = srcDir
    config.resolve.alias["~~"] = rootDir
    return config
    /* eslint-enable no-param-reassign */
  },
})
