const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, ipcRenderer } = electron;

var mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({frame: false, toolbar: false, transparent: true});
    mainWindow.loadURL(url.format({
        pathname: 'localhost:3000',
        protocol: 'http',
        slashes: true
    }));
});
app.on('maximize', () => {
    alert('meme');
});