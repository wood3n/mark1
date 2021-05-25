const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

const WINDOW_WIDTH = 1200;
const WINDOW_HEIGHT = 720;
const BG_COLOR = '#282C34';

let mainWindow;
// 创建一个浏览器窗口
function createWindow() {
  // 此处用let，因为exit时这里赋值null
  mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    minHeight: WINDOW_HEIGHT,
    minWidth: WINDOW_HEIGHT,
    center: true,
    backgroundColor: BG_COLOR,
    // 先隐藏窗口，当网页加载完以后通过事件打开
    show: false,
    // 隐藏electron自带的框架
    frame: false,
    // 同时将窗口大小设置为网页大小
    useContentSize: true,
    hasShadow: true,
    webPreferences: {
      // 在网页中可访问electron模块
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : url.format({
          pathname: path.join(__dirname, '../build/index.html'),
          protocol: 'file:',
          slashes: true,
        })
  );

  // 默认打开devtool
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    ipcMain.removeAllListeners();
  });

  // not working,because of this issue: https://github.com/electron/electron/issues/26726
  mainWindow.on('system-context-menu', (event, _point) => {
    event.preventDefault();
  });

  ipcMain.on('maximize', (event, arg) => {
    console.log(mainWindow.isMaximized());
    mainWindow.maximize();
    event.reply('maximize-reply');
  });

  ipcMain.on('unmaximize', (event, arg) => {
    mainWindow.unmaximize();
    event.reply('unmaximize-reply');
  });

  ipcMain.on('minimize', (event, arg) => {
    mainWindow.minimize();
    event.reply('minimize-reply');
  });

  ipcMain.on('closeApp', (event, arg) => {
    mainWindow.close();
    app.quit();
  });

  ipcMain.on('page-loaded', (event, arg) => {
    mainWindow.show();
    event.reply('loaded-reply');
  });
}

// 单例模式
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  // 在electron app初始化的时候即创建一个窗口
  app.whenReady().then(createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  // just work in macOS
  // https://www.electronjs.org/docs/api/app#%E4%BA%8B%E4%BB%B6-activate-macos
  app.on('activate', () => {
    // 只有当应用程序激活后没有可见窗口时，才能创建新的浏览器窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}
