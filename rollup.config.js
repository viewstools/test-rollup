import buble from 'rollup-plugin-buble'
import views from 'rollup-plugin-views'

const DONT_WARN_ON = ['MISSING_GLOBAL_NAME']

export default {
  entry: 'index.js',
  dest: 'public/app.js',
  external: Object.keys(require('./package.json').dependencies),
  format: 'iife',
  onwarn: w => {
    if (!DONT_WARN_ON.includes(w.code)) {
      console.log(w.message)
    }
  },
  plugins: [
    views({
      map: {
        Time: 'react-time',
      },
    }),
    buble(),
  ],
}
