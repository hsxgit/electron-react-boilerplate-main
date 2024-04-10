import { BrowserWindow, desktopCapturer, ipcMain } from 'electron';
import path from 'path';

let win: BrowserWindow;
export const createCtroWindow = () => {
  win = new BrowserWindow({
    width: 600,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, '../../../.erb/dll/preload.js'),
    },
  });
  win.loadFile(
    path.resolve(__dirname, '../../renderer/pages/control/index.html'),
  );
  getScreenStream();
};

async function getScreenStream() {
  ipcMain.on('start', async () => {
    const source = await desktopCapturer.getSources({ types: ['screen'] });
    win.webContents.send('SET_SOURCE', source[0].id);
  });
}
