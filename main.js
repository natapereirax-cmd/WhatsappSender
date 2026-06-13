const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { spawn } = require("child_process");

let window;
let secondWindow;

function createWindow() {
  window = new BrowserWindow({
    width: 400,
    height: 400,
    autoHideMenuBar: true,
    frame: false,
    resizable: false,
    icon: path.join(__dirname, "assets", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  window.loadFile(path.join(__dirname, "views", "login-screen.html"));

  ipcMain.on("open-window", () => {
    secondWindow = new BrowserWindow({
      width: 450,
      height: 400,
      autoHideMenuBar: true,
      frame: false,
      resizable: false,
      icon: path.join(__dirname, "assets", "icon.png"),
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        contextIsolation: true,
        nodeIntegration: false,
      },
    });
    secondWindow.loadFile(path.join(__dirname, "views", "dashboard.html"));
    window.close();
  });
}

ipcMain.on("window-close", (e) =>
  BrowserWindow.fromWebContents(e.sender).close(),
);
ipcMain.on("window-minimize", (e) =>
  BrowserWindow.fromWebContents(e.sender).minimize(),
);

ipcMain.handle("selecionar-arquivo", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: "Selecione a planilha",
    filters: [{ name: "Excel", extensions: ["xlsx", "xls"] }],
    properties: ["openFile"],
  });
  if (canceled || filePaths.length === 0) return null;
  return filePaths[0];
});

ipcMain.handle("enviar-whatsapp", async (event, arquivo, mensagem) => {
  const tmpFile = path.join(os.tmpdir(), `wamsg_${Date.now()}.txt`);
  fs.writeFileSync(tmpFile, mensagem, "utf-8");

  return new Promise((resolve, reject) => {
    const proc = spawn("python", ["python.py", arquivo, tmpFile]);

    let stderr = "";
    proc.stderr.on("data", (d) => {
      stderr += d.toString();
    });

    proc.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python exited ${code}: ${stderr}`));
      } else {
        resolve();
      }
    });
    proc.on("error", reject);
  });
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
