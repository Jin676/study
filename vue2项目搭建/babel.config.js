module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: (name) => `${name}/style/less`,//之前是true
    }, 'vant']
  ]
}
