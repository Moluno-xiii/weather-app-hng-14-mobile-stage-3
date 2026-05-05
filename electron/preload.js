const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  popupMenu: (items) => ipcRenderer.invoke("popup-menu", items),
  onContextMenuSelect: (handler) => {
    const listener = (_event, index) => handler(index);
    ipcRenderer.on("context-menu-select", listener);
    return () => ipcRenderer.removeListener("context-menu-select", listener);
  },
  onShortcut: (handler) => {
    const listener = (_event, name) => handler(name);
    ipcRenderer.on("shortcut", listener);
    return () => ipcRenderer.removeListener("shortcut", listener);
  },
});
