const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fetch = require("node-fetch");

// メインウィンドウ
let mainWindow;

const createWindow = () => {
    // メインウィンドウを作成します
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // プリロードスクリプトは、レンダラープロセスが読み込まれる前に実行され、
            // レンダラーのグローバル（window や document など）と Node.js 環境の両方にアクセスできます。
            preload: path.join(__dirname, "preload.js"),
        },
    });
    mainWindow.setMenu(null);

    // メインウィンドウに表示するURLを指定します
    // （今回はmain.jsと同じディレクトリのindex.html）
    mainWindow.loadFile("./renderer/index.html");

    // デベロッパーツールの起動
    mainWindow.webContents.openDevTools();

    // メインウィンドウが閉じられたときの処理
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
};

//  初期化が完了した時の処理
app.whenReady().then(() => {
    createWindow();

    // アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
    app.on("activate", () => {
        // メインウィンドウが消えている場合は再度メインウィンドウを作成する
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// 全てのウィンドウが閉じたときの処理
app.on("window-all-closed", () => {
    // macOSのとき以外はアプリケーションを終了させます
    if (process.platform !== "darwin") {
        app.quit();
    }
});

async function post(data) {
    const option = {
        method: "POST",
        body: JSON.stringify(data)
    }
    const url = "https://6naf6jfq2kyxu572bvrpeofozy0awwti.lambda-url.ap-northeast-1.on.aws/"
    return await fetch(url, option)
}

//以下IPC通信
ipcMain.handle("getAllNote", async (event) => {
    let response = await post({
        RequestType: "Get"
    })
    return (await response.json()).Note.Items;
});

ipcMain.handle("createNote", async (event, note) => {
    return await post({
        RequestType: "Create",
        Note: note
    })
});

ipcMain.handle("editNote", async (event, uuid, note) => {
    return await post({
        RequestType: "Edit",
        NoteUUID: uuid,
        Note: note
    })
});

ipcMain.handle("deleteNote", async (event, uuid) => {
    return await post({
        RequestType: "Delete",
        NoteUUID: uuid
    })
});

