const { compile } = require('nexe')

compile({
  input: './build/musis.js',
  build: true, //required to use patches
  target: 'windows-x86-12.15.0',
  vcBuild: [ 'sign', 'release' ],
  ico: './data/musis.ico',
  verbose: true
}).then(() => {
  console.log('success')
})
