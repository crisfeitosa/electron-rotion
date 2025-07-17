import { app, shell, BrowserWindow } from 'electron'
import path from 'node:path'
import { createTray } from './tray'
import { createShortcuts } from './shortcuts'
import { registerRoute } from '../lib/electron-router-dom'
import icon from '../../resources/icon.png'

import { platform } from 'node:process'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import './ipc'
import './store'

async function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1120,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#17141f',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 20, y: 20 },
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.cjs'),
      sandbox: false,
    },
  })

  createTray(mainWindow)
  createShortcuts(mainWindow)

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
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

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
