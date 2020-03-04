module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/applicants-work-public/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}
