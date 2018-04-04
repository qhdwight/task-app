const electron = require('electron');
const url = require('url');
const path = require('path');
const firebase = require('firebase');

const { app, BrowserWindow } = electron;

var mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({frame: false, toolbar: false, transparent: true});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'tasks.html'),
        protocol: 'file',
        slashes: true
    }));
    const config = {
        apiKey: "AIzaSyBPw77zVbw_7k9wVleGD0QjVh3wGrOoY3s",
        authDomain: "taskapp-fb82c.firebaseapp.com",
        databaseURL: "https://taskapp-fb82c.firebaseio.com",
        projectId: "taskapp-fb82c",
        storageBucket: "",
        messagingSenderId: "1023939079882"
    }
    firebase.initializeApp(config);
    // firebase.database().ref().set({
    //     test: "bet"
    // });
});