import { app, shell, BrowserWindow } from 'electron'
import path from 'node:path'
import { registerRoute } from '../lib/electron-router-dom'
import { platform } from 'node:process'
import { is } from '@electron-toolkit/utils'

async function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#17141f',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 20, y: 20 },
    ...(platform === 'linux'
      ? {
          icon: is.dev
            ? path.resolve(__dirname, '../../resources/icon.png')
            : path.resolve(__dirname, '../../build/icon.png'),
        }
      : {}),
  })

  registerRoute({
    id: 'main',
    browserWindow: mainWindow,
    htmlFile: path.join(__dirname, '../renderer/index.html'),
  })

  mainWindow.on('ready-to-show', mainWindow.show)
}

if (platform === 'darwin') {
  const iconPath = is.dev
    ? path.resolve(__dirname, '../../resources/icon.png')
    : path.resolve(__dirname, 'icon.png')
  app.dock?.setIcon(iconPath)
}

app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('web-contents-created', (_, contents) =>
  contents.on('will-navigate', (event, url) => {
    event.preventDefault()

    if (url.startsWith(process.env.ELECTRON_RENDERER_URL!)) return

    shell.openExternal(url)
  }),
)
