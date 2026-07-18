import { ipcMain } from "electron";

let bluetoothPinCallback;
let selectBluetoothCallback: any;

export const listenBluetoothEvent = (mainWindow: any) => {
  mainWindow.webContents.on(
    "select-bluetooth-device",
    (event: any, deviceList: any, callback: any) => {
      event.preventDefault();
      selectBluetoothCallback = callback;
      console.log("deviceList", deviceList);
      const result = deviceList.find((device: any) => {
        return device.deviceName === "test";
      });
      if (result) {
        callback(result.deviceId);
      } else {
        console.log("device not found");
        // The device wasn't found so we need to either wait longer (eg until the
        // device is turned on) or until the user cancels the request
      }
    },
  );

  ipcMain.on("cancel-bluetooth-request", (event) => {
    if (selectBluetoothCallback) {
      selectBluetoothCallback("");
    }
  });
};
