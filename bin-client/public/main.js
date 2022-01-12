const {app, BrowserWindow} = require('electron')
require("@electron/remote/main").initialize()

function createWindow(){

    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    });

    window.loadURL("http://localhost:3000")
}

app.on("ready",createWindow)