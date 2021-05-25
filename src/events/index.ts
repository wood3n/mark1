const { remote, ipcRenderer } = window.electron;

function minimize(afterMinimize?: () => void) {
  ipcRenderer.on('maximize-reply', (event, arg) => {
    afterMinimize?.();
  });
  ipcRenderer.send('minimize');
}

function unmaximize(afterUnMinimize?: () => void) {
  ipcRenderer.on('unmaximize-reply', (event, arg) => {
    afterUnMinimize?.();
  });
  ipcRenderer.send('unmaximize');
}

function maximize(afterMaximize?: () => void) {
  ipcRenderer.on('unmaximize-reply', (event, arg) => {
    afterMaximize?.();
  });
  ipcRenderer.send('maximize');
}

function close(afterClose?: () => void) {
  ipcRenderer.on('close-reply', (event, arg) => {
    afterClose?.();
  });
  ipcRenderer.send('closeApp');
}

function openWindow() {
  ipcRenderer.send('page-loaded');
}

export default {
  minimize,
  unmaximize,
  maximize,
  close,
  openWindow,
};
