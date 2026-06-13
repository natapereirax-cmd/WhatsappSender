const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window-minimize"),
  close: () => ipcRenderer.send("window-close"),
  openWindow: () => ipcRenderer.send("open-window"),
  selecionarArquivo: () => ipcRenderer.invoke("selecionar-arquivo"),
  enviarWhatsapp: (arquivo, mensagem) =>
    ipcRenderer.invoke("enviar-whatsapp", arquivo, mensagem),
});
