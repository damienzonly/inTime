const { app, BrowserWindow } = require('electron');
const serve = require('electron-serve');

const loadURL = serve({ directory: 'build' });

(async () => {
    await app.whenReady();
    mainWindow = new BrowserWindow({
        webPreferences: { devTools: false },
        useContentSize: true,
        width: 1500,
        height: 800,
        minWidth: 1500,
        minHeight: 800
    });
    await loadURL(mainWindow);
})();