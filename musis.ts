import fs, { Stats, lstat } from 'fs'
import readline from 'readline'
import path from 'path'

const TEMPLATE_FILENAME = 'musis-template.html'
const PLACEHOLDER = '<div class="musis"></div>'
const DEFAULT_TEMPLATE = `<!DOCTYPE HTML>
<html>
  <head>
    <title>MusIs</title>
    <meta charset="UTF-8" />
    <style>
      .musis_playlist, .musis_audio {
        background: #666;
        width: 400px;
        padding: 20px;
      }

      .musis_playlist {
        display: none;
      }

      .musis_playlist a {
        color: #eeeedd;
        background: #333;
        padding: 5px;
        display: block;
      }

      .musis_playlist a:hover {
        text-decoration: none;
      }

      .musis_playlist .musis_active {
        color: #5DB0E6;
        text-decoration: none;
      }
    </style>
    <script>
      function musisRegister(audio, playlist) {
        audio.volume = 1.0
        audio.play()
        
        var current = 0;  
        const tracks = playlist.querySelectorAll('li a')
        const len = tracks.length
      
        for (var i = 0; i < tracks.length; i++) {
          tracks[i].addEventListener('click', (function (i, event) {
            event.preventDefault()
            run(i)
          }).bind(this, i))
        }

        audio.addEventListener('ended', function (event) {
          current++;
          if (current == len) {
            current = 0;
          }

          run(current);
        });

        function run (index, stop) {
          current = index
          audio.src = tracks[index].dataset.file;
          const currentActive = playlist.querySelector('.musis_active')
          if (currentActive) currentActive.classList.remove('musis_active')
          tracks[index].classList.add('musis_active')
          audio.load();
          if (!stop) audio.play();
        }

        run(0, true)
      }
    </script>
  </head>
  <body>
    <div class="musis"></div>
  </body>
</html>
`

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const fsp = fs.promises

function q1 (_recursive?: string[]): Promise<string[]> {
  return new Promise((resolve, reject) => {
    try {
      rl.question('확장자 입력.(예시: mp3) 그만 입력하려면 엔터>', async (answer) => {
        if (answer) {
          if (_recursive) {
            _recursive.push(answer)
            return resolve(await q1(_recursive))
          } else {
            return resolve(await q1([ answer ]))
          }
        } else {
          resolve(_recursive || [])
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

function q2 (cwd: string, _recursive?: string[]): Promise<string[]> {
  return new Promise((resolve, reject) => {
    let subdir = ''
    try {
      rl.question('음악 스캔할 하위 폴더 이름. 그만 입력하려면 엔터>', async (answer) => {
        if (answer) {
          const stat = await fsp.lstat(subdir = path.join(cwd, answer))
          if (!stat.isDirectory()) throw new Error('폴더가 아님: ' + subdir)
          if (_recursive) {
            _recursive.push(answer)
            return resolve(await q2(cwd, _recursive))
          } else {
            return resolve(await q2(cwd, [ answer ]))
          }
        } else {
          resolve(_recursive || [])
        }
      })
    } catch (err) {
      if (err.code === 'ENOENT') {
        reject(new Error('존재하지 않는 폴더: ' + subdir))
      } else {
        reject(err)
      }
    }
  })
}

function checkExtension(fileName: string, extensionArray: string[]): boolean {
  const split = fileName.split('.')
  const last = split[split.length - 1].toLowerCase()
  for (let ext of extensionArray) {
    if (last === ext.toLowerCase()) {
      return true
    }
  }
  return false
}

async function dirToHtml (cwd: string, subdir: string, exts: string[]): Promise<string|number> {
  const subcwd = path.join(cwd, subdir)
  // 파일 읽기
  console.log('파일 읽어들이는 중...')
  const files = await fsp.readdir(subcwd)
  console.log('폴더안의 총 파일 갯수: ' + files.length)
  const filesNameFilter = files.filter(v => checkExtension(v, exts))
  console.log('확장자에 맞는 파일 갯수: ' + filesNameFilter.length)
  const filesTypeFilter = []
  let _path: string
  let _stat: Stats
  for (let file of filesNameFilter) {
    _path = path.join(subcwd, file)
    _stat = await fsp.lstat(_path)
    if (_stat.isFile()) filesTypeFilter.push(file)
  }
  console.log('폴더 제외 후 갯수: ' + filesTypeFilter.length)

  if (filesTypeFilter.length === 0) {
    console.error('찾은 파일 갯수 0. 무시됨')
    return 3
  }

  console.log('HTML 빌드 중...')
  let hash = parseInt('' + (Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0')
  let source = `\n    <p class="musis_title musis_title_${ hash }">${ subdir }</p>
    <audio class="musis_audio musis_audio_${ hash }" controls></audio>
    <ul class="musis_playlist musis_playlist_${ hash }">`
  for (let music of filesTypeFilter) {
    source += `\n      <li>
        <a data-file="${ path.join(subdir, music) }" href="#">${ music }</a>
      </li>`
  }
  source += `\n    </ul>
    <script>
      musisRegister(document.querySelector('.musis_audio_${ hash }'), document.querySelector('.musis_playlist_${ hash }'))
    </script>`
  return source
}

async function main (): Promise<number> {
  const cwd = path.resolve('.')
  console.log('현재 폴더: ' + cwd)

  // 템플릿 읽거나 없으면 새로 만들기
  let template: string
  const templateFile = path.join(cwd, TEMPLATE_FILENAME)
  try {
    template = await fsp.readFile(templateFile, 'utf-8')
  } catch (err) {
    if (err.code === 'ENOENT') {
      fsp.writeFile(templateFile, DEFAULT_TEMPLATE, 'utf-8')
      console.log(`템플릿 새로 생성(${ TEMPLATE_FILENAME }) 원하는 대로 커스터마이징`)
      console.log('이후 프로그램 재시작')
      console.log(`\n(주의: "${ PLACEHOLDER }" 태그 편집 금지)`)
      return 10
    } else {
      throw err
    }
  }

  // 템플릿 유효성 확인
  if (template.indexOf(PLACEHOLDER) === -1) {
    console.error(`템플릿에서 "${ PLACEHOLDER }" 태그를 찾을 수 없음`)
    return 10
  }

  // 하위 폴더 선택
  const subdirs = await q2(cwd)

  // 확장자
  const exts = await q1()
  if (exts.length === 0) {
    console.error('아무 확장자도 입력하지 않았으므로 무시')
    return 3
  } else {
    console.log('입력된 확장자:', exts)
  }

  let sources = ''
  let result: string|number = 0
  for (const subdir of subdirs) {
    result = await dirToHtml(cwd, subdir, exts)
    if (typeof result === 'number') return result
    sources += result
  }
  
  console.log('HTML 파일 생성 중...')
  const html = template.replace(PLACEHOLDER, sources)
  await fsp.writeFile(`MusIs.html`, html, 'utf-8')
  console.log('성공')
  return 3 
}

main().then(timeout => {
  console.log('=종료=')
  console.log(`콘솔 ${ timeout }초 후 닫힘...`)
  setTimeout(() => {
    process.exit(0)
  }, timeout * 1000)
}).catch(err => {
  console.error(err)
  console.error('=치명적 에러=')
  console.error('콘솔 10초 후 닫힘...')
  setTimeout(() => {
    process.exit(0)
  }, 10000)
})
