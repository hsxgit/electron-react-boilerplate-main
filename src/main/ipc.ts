import { ipcMain } from 'electron';
import { createCtroWindow } from './windows/control';
import { send as sendState } from './windows/main';

export const handleIPC = () => {
  ipcMain.handle('login', () => {
    return '1234';
  });
  ipcMain.on('control', (_, remoteCode: string) => {
    createCtroWindow();
    sendState('control-state-change', remoteCode, 1);
  });
};
