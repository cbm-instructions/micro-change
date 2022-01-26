require("@electron/remote/main").initialize()

const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow(){

    const window = new BrowserWindow({
        autoHideMenuBar: true,
        frame: false,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    });

    window.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, '../build/index.html')}`).then(r => window.maximize());
}

app.on("ready",createWindow)