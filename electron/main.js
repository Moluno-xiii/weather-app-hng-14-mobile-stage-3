const { app, BrowserWindow, Menu, ipcMain, shell } = require("electron");
const path = require("node:path");

const isDev = process.env.ELECTRON_DEV === "1";
const DEV_URL = "http://localhost:8081";

let mainWindow = null;

const sendShortcut = (name) => {
  if (mainWindow) mainWindow.webContents.send("shortcut", name);
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: "#F6F1E7",
    title: "Weather",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.webContents.on("page-title-updated", (event) => {
    event.preventDefault();
  });

  if (isDev) {
    mainWindow.loadURL(DEV_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

const buildMenu = () => {
  const isMac = process.platform === "darwin";
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Refresh weather",
          accelerator: "CmdOrCtrl+R",
          click: () => sendShortcut("refresh"),
        },
        { type: "separator" },
        isMac ? { role: "close" } : { role: "quit" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" },
      ],
    },
    {
      label: "View",
      submenu: [
        {
          label: "Today",
          accelerator: "CmdOrCtrl+1",
          click: () => sendShortcut("nav-today"),
        },
        {
          label: "Search",
          accelerator: "CmdOrCtrl+2",
          click: () => sendShortcut("nav-search"),
        },
        {
          label: "Focus search",
          accelerator: "CmdOrCtrl+F",
          click: () => sendShortcut("focus-search"),
        },
        { type: "separator" },
        { role: "togglefullscreen" },
        { role: "toggleDevTools" },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Learn more",
          click: () =>
            shell.openExternal("https://openweathermap.org/api"),
        },
        {
          label: "About",
          click: () => sendShortcut("about"),
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

ipcMain.handle("popup-menu", (event, items) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || !Array.isArray(items)) return;
  const template = items.map((it, i) => ({
    label: it.label,
    click: () => event.sender.send("context-menu-select", i),
  }));
  Menu.buildFromTemplate(template).popup({ window: win });
});

app.whenReady().then(() => {
  buildMenu();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
