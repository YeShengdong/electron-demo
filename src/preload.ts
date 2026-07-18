// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 除函数之外，我们也可以暴露变量
});

contextBridge.exposeInMainWorld("electronAPI", {
  cancelBluetoothRequest: () => ipcRenderer.send("cancel-bluetooth-request"),
  bluetoothPairingRequest: (callback: (event: any, details: Record<string, any>) => void) =>
    ipcRenderer.on("bluetooth-pairing-request", callback),
  bluetoothPairingResponse: (response: Record<string, any>) =>
    ipcRenderer.send("bluetooth-pairing-response", response),
});
