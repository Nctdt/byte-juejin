import dayjs from 'dayjs'

declare global {
  interface Window {
    dayjs: typeof dayjs
    VConsole: new () => void
  }
}

if (process.env.NODE_ENV === 'development') {
  var script = document.createElement('script')
  script.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js'
  script.onload = () => {
    console.log('load success')
    new window.VConsole()
  }
  document.body.appendChild(script)
}
window.dayjs = dayjs
