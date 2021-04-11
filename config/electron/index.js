const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// 创建一个浏览器窗口
function createWindow() {
  // 此处用let，因为exit时这里赋值null
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // mainWindow.loadURL(
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://localhost:5000'
  //     : url.format({
  //         pathname: path.join(__dirname, '../public/index.html'),
  //         protocol: 'file:',
  //         slashes: true,
  //       })
  // );
  mainWindow.maximize();

  mainWindow.loadURL('http://localhost:5000');

  // 默认打开devtool
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 在electron app初始化的时候即创建一个窗口
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 只有当应用程序激活后没有可见窗口时，才能创建新的浏览器窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
