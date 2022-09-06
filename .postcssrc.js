const pxTorem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    pxTorem({
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*']
    })
  ]
}
