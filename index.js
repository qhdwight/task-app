const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

var mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.setMenu(null);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
});