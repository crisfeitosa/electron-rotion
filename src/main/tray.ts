import { BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import icon from '../../resources/rotionTemplate@3x.png?asset'

export function createTray(window: BrowserWindow) {
  const trayIcon = nativeImage.createFromPath(icon)

  const tray = new Tray(trayIcon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    {
      type: 'checkbox',
      label: 'Ativar modo dark',
      checked: true,
    },
    {
      label: 'Criar novo documento',
      click: () => {
        window.webContents.send('new-document')
      },
    },
    { type: 'separator' },
    { label: 'Documentos recentes', enabled: false },
    {
      label: 'Ignite',
      accelerator: 'CommandOrControl+1',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Pessoal',
      accelerator: 'CommandOrControl+2',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Untitled',
      accelerator: 'CommandOrControl+3',
      acceleratorWorksWhenHidden: false,
    },
    { type: 'separator' },
    {
      label: 'Sair do Rotion',
      role: 'quit',
    },
  ])

  tray.setContextMenu(contextMenu)
}
